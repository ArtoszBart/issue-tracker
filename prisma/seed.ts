import { PrismaClient, Status } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	// Check if database is already seeded
	const userNo = await prisma.user.count();
	const issueNo = await prisma.issue.count();
	const commentNo = await prisma.comment.count();

	if (userNo !== 0 || issueNo !== 0 || commentNo !== 0)
		return console.log(
			'Database is already seeded. Skipping seeding process.'
		);

	// Create users
	await prisma.user.createMany({
		data: [
			{
				name: 'John Doe',
				email: 'john.doe@example.com',
				emailVerified: new Date('2020-01-01 00:00:00'),
				hashedPassword:
					'$2b$12$LFtqyZqdw5L5FbKYxJieI.zBhtdfkKAh/zVO31IrK48jK3RQ9Ppf2',
				image: 'https://randomuser.me/api/portraits/men/60.jpg',
			},
			{
				name: 'Bob Smith',
				email: 'bob.smith@example.com',
				emailVerified: new Date('2020-01-01 00:00:00'),
				hashedPassword:
					'$2b$12$OdXhISR9p3TvJcTaLo8VTubPw7koDRHYrg97fHCqyZGMfSK9vYRSi',
				image: 'https://randomuser.me/api/portraits/men/74.jpg',
			},
			{
				name: 'Carol Williams',
				email: 'carol.williams@example.com',
				emailVerified: new Date('2020-01-01 00:00:00'),
				hashedPassword:
					'$2b$12$QoB0kD0AvsqBfKX0NDU83uqy3sdRoBHGbil.duEnYO4ydS2FTqi8i',
				image: 'https://randomuser.me/api/portraits/men/55.jpg',
			},
		],
	});

	const userIds = (await prisma.user.findMany()).map((user) => user.id);

	const issueData: {
		title: string;
		description: string;
		status: Status;
		createdAt: Date;
		assignedToUserId?: string;
	}[] = [
		{
			title: 'Fix Login Authentication Flow',
			description: `# Issue: Login Flow Not Working\n\nThere is an issue with the login flow where users are redirected incorrectly after login. Steps to reproduce:\n\n1. Attempt to login using valid credentials.\n2. Observe redirection error.\n\n**Expected Result:**\nUser should be redirected to the dashboard.\n\n**Actual Result:**\nUser sees a "Page not found" error.`,
			status: 'IN_PROGRESS',
			createdAt: new Date('2020-05-09T12:18:22'),
		},
		{
			title: 'Update User Profile Feature',
			description: `# User Profile Update\n\nUsers have reported issues when trying to update their profiles. Fields are not saving correctly, and changes are sometimes reverted on refresh. Steps to investigate:\n\n1. Update user details.\n2. Save and refresh the page.\n\nWe need to confirm that all profile fields are saved correctly.`,
			status: 'CLOSED',
			createdAt: new Date('2020-08-25T04:20:58'),
			assignedToUserId: userIds[0],
		},
		{
			title: 'Improve Loading Speed on Homepage',
			description: `# Performance Issue on Homepage\n\nThe homepage is taking over 5 seconds to load on average, which is negatively impacting user experience. Investigate and optimize database queries and image loading strategies.\n\n- Ensure queries are indexed correctly.\n- Lazy-load images below the fold.`,
			status: 'OPEN',
			createdAt: new Date('2020-09-03T08:21:54'),
		},
		{
			title: 'Error in Password Reset Flow',
			description: `# Password Reset Error\n\nUsers are reporting that password reset links are expiring immediately. This issue may be related to incorrect token validation or time zone misalignment. Steps:\n\n1. Request a password reset.\n2. Attempt to use the reset link immediately.\n\n**Expected Result:**\nLink should be valid for at least 15 minutes.`,
			status: 'IN_PROGRESS',
			createdAt: new Date('2020-10-10T02:16:13'),
			assignedToUserId: userIds[1],
		},
		{
			title: 'UI Glitch on Profile Page',
			description: `# UI Misalignment on Profile Page\n\nThe profile page has elements overlapping on smaller screens. This may be due to unresponsive CSS. Testing needed across different viewport sizes.\n\n- Ensure buttons and inputs are accessible.\n- Update CSS to be responsive.`,
			status: 'OPEN',
			createdAt: new Date('2020-11-21T14:10:42'),
		},
		{
			title: 'Broken Links in Footer',
			description: `# Footer Links Not Working\n\nSeveral links in the footer are resulting in 404 errors. Confirm all links are correct and point to active pages.\n\n**Steps:**\n1. Visit any page.\n2. Click on links in the footer.\n\n**Expected Result:**\nAll links should navigate to the intended pages.`,
			status: 'CLOSED',
			createdAt: new Date('2020-11-30T06:19:15'),
		},
		{
			title: 'Search Functionality Not Returning Results',
			description: `# Search Not Working\n\nUsers are unable to find results when using the search bar. This might be related to incorrect query syntax or missing index.\n\n1. Enter a known term in the search bar.\n2. Observe if any results are returned.\n\n**Expected Result:**\nRelevant results should be displayed.`,
			status: 'OPEN',
			createdAt: new Date('2020-12-01T05:29:18'),
			assignedToUserId: userIds[2],
		},
		{
			title: 'Notifications Not Being Sent',
			description: `# Issue with Notification System\n\nNotifications are not being triggered on certain actions, such as comment replies. Investigate the notification service to ensure all triggers are working.\n\n**Steps:**\n1. Reply to a comment.\n2. Check if notification is received.`,
			status: 'IN_PROGRESS',
			createdAt: new Date('2021-01-14T03:45:20'),
		},
		{
			title: 'Image Upload Failing on Large Files',
			description: `# Image Upload Limit Exceeded\n\nUsers receive an error when uploading images over 5MB. Investigate file size restrictions and provide user-friendly error messages.\n\n- Ensure large images are compressed or downsized automatically.\n- Display clear file size requirements.`,
			status: 'CLOSED',
			createdAt: new Date('2021-02-03T16:18:30'),
			assignedToUserId: userIds[0],
		},
		{
			title: 'Dashboard Analytics Not Updating',
			description: `# Dashboard Stuck on Old Data\n\nAnalytics on the dashboard are not reflecting recent activity. Check if the data pipeline is working as expected.\n\n- Review recent database updates.\n- Confirm data is refreshing on the dashboard at regular intervals.`,
			status: 'OPEN',
			createdAt: new Date('2021-02-18T12:22:34'),
		},
		{
			title: 'Button Hover Effects Missing',
			description: `# UI Improvement: Button Feedback\n\nButtons across the app lack hover feedback, making them feel unresponsive. Implement consistent hover states for all buttons.\n\n- Apply hover effects like color change or shadow.\n- Test on all major pages.`,
			status: 'IN_PROGRESS',
			createdAt: new Date('2021-04-17T15:41:09'),
		},
		{
			title: 'Mobile Menu Not Closing on Selection',
			description: `# Mobile Navigation Issue\n\nOn mobile devices, the menu does not close when an item is selected. Add functionality to close the menu after selection to improve UX.\n\n- Test on popular mobile devices and browsers.`,
			status: 'IN_PROGRESS',
			createdAt: new Date('2021-05-15T11:32:21'),
			assignedToUserId: userIds[1],
		},
		{
			title: 'Incorrect Currency Display in Checkout',
			description: `# Currency Display Error\n\nThe checkout page sometimes displays prices in the wrong currency. Ensure currency is consistent throughout the user session.\n\n- Test checkout flow from different regions.\n- Verify currency conversion logic if applicable.`,
			status: 'CLOSED',
			createdAt: new Date('2021-05-29T01:17:33'),
		},
		{
			title: 'Session Timeout Not Working',
			description: `# Session Timeout Error\n\nUsers are staying logged in indefinitely. Ensure session timeouts are working as expected for security compliance.\n\n- Set timeout to 15 minutes for testing.\n- Verify if users are logged out after inactivity.`,
			status: 'OPEN',
			createdAt: new Date('2021-07-14T14:05:39'),
		},
		{
			title: 'Broken Image Links on Product Page',
			description: `# Missing Product Images\n\nSome images on the product page are not loading, resulting in broken image icons. Check if images are missing in the database or incorrectly referenced.\n\n- Confirm all product images are available on the server.`,
			status: 'CLOSED',
			createdAt: new Date('2022-03-15T08:34:21'),
			assignedToUserId: userIds[0],
		},
		{
			title: 'API Rate Limit Exceeded for Free Users',
			description: `# API Rate Limiting\n\nFree-tier users report that API rate limits are being exceeded too quickly. Verify rate limits and provide users with accurate feedback.\n\n- Set rate limits at 100 requests per hour for free users.\n- Add messages to inform users of limits.`,
			status: 'IN_PROGRESS',
			createdAt: new Date('2022-04-15T23:34:11'),
			assignedToUserId: userIds[2],
		},
		{
			title: 'Security Vulnerability in Password Validation',
			description: `# Password Security Check\n\nThe current password validation does not enforce complexity. Update the validation to require strong passwords, including a mix of uppercase, lowercase, numbers, and symbols.\n\n- Test various password combinations.\n- Enforce security policy guidelines.`,
			status: 'OPEN',
			createdAt: new Date('2022-05-20T21:22:43'),
		},
		{
			title: 'Comment Threading Display Issue',
			description: `# Comment Threads Misaligned\n\nNested comments are not displaying correctly, causing confusion. Update CSS and logic to ensure replies are properly nested.\n\n- Check if each reply is aligned under the correct parent comment.`,
			status: 'CLOSED',
			createdAt: new Date('2022-06-05T12:24:30'),
		},
		{
			title: 'File Download Timeout for Large Files',
			description: `# Download Timeout\n\nUsers report download timeouts for files over 100MB. Investigate server handling of large files and implement resumable downloads if needed.\n\n- Test on various network speeds.\n- Ensure timeouts are appropriate for large file sizes.`,
			status: 'IN_PROGRESS',
			createdAt: new Date('2023-01-02T08:33:50'),
			assignedToUserId: userIds[1],
		},
		{
			title: 'Inconsistent Date Format in Reports',
			description: `# Date Format Standardization\n\nReports are showing dates in mixed formats. Standardize all dates to ISO 8601 format for consistency.\n\n- Check all report generation modules.\n- Update formats in the front-end if necessary.`,
			status: 'OPEN',
			createdAt: new Date('2023-03-11T04:27:19'),
		},
	];

	// Create issues
	await prisma.issue.createMany({
		data: issueData,
	});

	const issueIds = (await prisma.issue.findMany()).map((issue) => issue.id);

	const commentData: {
		content: string;
		createdAt: Date;
		issueId: number;
		authorId: string;
	}[] = [
		{
			content:
				"I'm experiencing the same issue on both mobile and desktop. It seems to occur after clearing the browser cache.",
			createdAt: new Date('2020-08-16T18:45:50'),
			issueId: issueIds[0],
			authorId: userIds[2],
		},
		{
			content:
				"After login, the URL redirects to '/dashboard' but quickly changes to '/not-found'. Could there be a double redirection happening here?",
			createdAt: new Date('2021-03-10T07:29:41'),
			issueId: issueIds[0],
			authorId: userIds[1],
		},
		{
			content:
				"The homepage load time is really frustrating, especially on mobile. It can take up to 10 seconds before it's fully visible.",
			createdAt: new Date('2020-12-20T22:35:16'),
			issueId: issueIds[2],
			authorId: userIds[0],
		},
		{
			content:
				"I've noticed the homepage is slower when there are more images. Maybe lazy-loading images could help?",
			createdAt: new Date('2021-05-10T06:13:09'),
			issueId: issueIds[2],
			authorId: userIds[2],
		},
		{
			content:
				"I cleared my browser cache, and the homepage loads faster now, but it's still not ideal. Could caching be optimized?",
			createdAt: new Date('2021-11-02T01:45:03'),
			issueId: issueIds[2],
			authorId: userIds[1],
		},
		{
			content:
				'I think the slow load is due to large images not being compressed. Can we use smaller image sizes or formats like WebP?',
			createdAt: new Date('2022-03-29T18:31:20'),
			issueId: issueIds[2],
			authorId: userIds[2],
		},
		{
			content:
				'The homepage takes a while to load even when the database queries seem fine. Could there be some frontend bottleneck?',
			createdAt: new Date('2022-08-15T10:12:55'),
			issueId: issueIds[2],
			authorId: userIds[0],
		},
		{
			content:
				"It's even slower when using 3G or a slower connection. Maybe we need to consider reducing the number of initial requests.",
			createdAt: new Date('2023-05-27T14:20:06'),
			issueId: issueIds[2],
			authorId: userIds[1],
		},
		{
			content:
				'I tried resetting my password, but the link expired within seconds. This needs to be fixed ASAP!',
			createdAt: new Date('2021-02-28T20:39:22'),
			issueId: issueIds[3],
			authorId: userIds[2],
		},
		{
			content:
				'I noticed this happens when I request a password reset right before I go to bed. Could it be a time zone issue?',
			createdAt: new Date('2021-06-22T10:25:01'),
			issueId: issueIds[3],
			authorId: userIds[0],
		},
		{
			content:
				'The password reset link expires before I even have a chance to click it. Could this be caused by a server time mismatch?',
			createdAt: new Date('2021-12-15T12:18:56'),
			issueId: issueIds[3],
			authorId: userIds[1],
		},
		{
			content:
				'The reset link seems to expire within a minute of receiving it, regardless of how fast I click it. Definitely a bug.',
			createdAt: new Date('2022-04-20T21:07:18'),
			issueId: issueIds[3],
			authorId: userIds[2],
		},
		{
			content:
				'The profile page looks great on desktop but is a mess on mobile. Buttons are overlapping and inputs are hidden behind images.',
			createdAt: new Date('2021-04-15T07:55:12'),
			issueId: issueIds[4],
			authorId: userIds[0],
		},
		{
			content:
				"On smaller screens, the profile photo overlaps with the bio section. It's making the page hard to navigate.",
			createdAt: new Date('2021-09-05T23:28:31'),
			issueId: issueIds[4],
			authorId: userIds[1],
		},
		{
			content:
				'The buttons on the profile page are not properly aligned when viewed on tablets. They end up stacked on top of each other.',
			createdAt: new Date('2022-03-11T17:39:27'),
			issueId: issueIds[4],
			authorId: userIds[0],
		},
		{
			content:
				'This issue happens on my phone in portrait mode. In landscape, everything seems fine. Maybe a media query issue?',
			createdAt: new Date('2022-06-23T04:05:41'),
			issueId: issueIds[4],
			authorId: userIds[2],
		},
		{
			content:
				"I've noticed this problem only on iPhones. Could it be related to how Safari handles viewport sizing?",
			createdAt: new Date('2023-02-09T09:25:13'),
			issueId: issueIds[4],
			authorId: userIds[1],
		},
		{
			content:
				'When switching from desktop to mobile, the profile section loses its structure completely. The text boxes are squeezed together.',
			createdAt: new Date('2023-05-26T13:47:56'),
			issueId: issueIds[4],
			authorId: userIds[0],
		},
		{
			content:
				'Using Flexbox or CSS Grid might solve the issue. It seems like a problem with the layout not adapting properly.',
			createdAt: new Date('2023-08-21T21:03:42'),
			issueId: issueIds[4],
			authorId: userIds[1],
		},
		{
			content:
				'I had to zoom in to click some buttons on my profile page. This issue needs to be addressed for accessibility.',
			createdAt: new Date('2024-03-03T18:45:07'),
			issueId: issueIds[4],
			authorId: userIds[2],
		},
		{
			content:
				"I clicked on the 'Privacy Policy' link in the footer and got a 404 error. This is really annoying.",
			createdAt: new Date('2021-01-12T22:07:54'),
			issueId: issueIds[5],
			authorId: userIds[2],
		},
		{
			content:
				'The footer links are broken on every page. It looks like they might be pointing to outdated URLs.',
			createdAt: new Date('2021-04-03T15:24:13'),
			issueId: issueIds[5],
			authorId: userIds[0],
		},
		{
			content:
				"I tried clicking the 'Terms of Service' link, and it leads to a 'Page not found' error. Needs to be fixed immediately.",
			createdAt: new Date('2021-07-27T10:52:43'),
			issueId: issueIds[5],
			authorId: userIds[1],
		},
		{
			content:
				"I've tried searching for multiple terms, but nothing ever shows up. It's like the search bar is broken.",
			createdAt: new Date('2021-03-12T14:41:10'),
			issueId: issueIds[6],
			authorId: userIds[2],
		},
		{
			content:
				"The search bar isn't returning anything, even for terms I know exist. Is there an issue with the query syntax?",
			createdAt: new Date('2021-07-08T23:19:56'),
			issueId: issueIds[6],
			authorId: userIds[0],
		},
		{
			content:
				'I used to be able to search for items easily, but now the search results page just loads with no results.',
			createdAt: new Date('2021-10-21T17:03:22'),
			issueId: issueIds[6],
			authorId: userIds[1],
		},
		{
			content:
				'The search function returns no results regardless of what I type. Could it be an issue with indexing?',
			createdAt: new Date('2022-01-18T07:26:15'),
			issueId: issueIds[6],
			authorId: userIds[2],
		},
		{
			content:
				"I think the issue is related to how the search queries are being formatted. It doesn't seem to recognize partial matches.",
			createdAt: new Date('2022-05-05T08:57:38'),
			issueId: issueIds[6],
			authorId: userIds[1],
		},
		{
			content:
				"I've tried clearing my cache and even used different devices, but no change. This seems like a backend issue.",
			createdAt: new Date('2022-12-22T21:45:17'),
			issueId: issueIds[6],
			authorId: userIds[0],
		},
		{
			content:
				"It's frustrating when the search bar doesn't even suggest results. Can someone confirm if the database is properly indexed?",
			createdAt: new Date('2023-06-11T05:39:43'),
			issueId: issueIds[6],
			authorId: userIds[2],
		},
		{
			content:
				'I replied to a comment, but never received a notification. This is happening across multiple threads.',
			createdAt: new Date('2021-06-01T09:27:05'),
			issueId: issueIds[7],
			authorId: userIds[0],
		},
		{
			content:
				'I tried uploading an image over 5MB, but it failed with an error. Can we get a clearer error message about the size limit?',
			createdAt: new Date('2021-08-28T22:34:41'),
			issueId: issueIds[8],
			authorId: userIds[1],
		},
		{
			content:
				'The upload worked fine for smaller images, but anything over 5MB just gets stuck or fails entirely.',
			createdAt: new Date('2022-02-07T15:02:18'),
			issueId: issueIds[8],
			authorId: userIds[2],
		},
		{
			content:
				"The analytics on my dashboard are stuck. I haven't seen any updates in over a day, even though activity is happening.",
			createdAt: new Date('2021-06-13T08:51:02'),
			issueId: issueIds[9],
			authorId: userIds[1],
		},
		{
			content:
				"I noticed that the dashboard analytics are showing old data. The numbers haven't changed even though we've had several new user sign-ups.",
			createdAt: new Date('2021-09-05T20:15:32'),
			issueId: issueIds[9],
			authorId: userIds[0],
		},
		{
			content:
				'The lack of hover effects on buttons is making the UI feel unresponsive. Adding a subtle shadow or color change would improve usability.',
			createdAt: new Date('2021-08-30T20:53:41'),
			issueId: issueIds[10],
			authorId: userIds[2],
		},
		{
			content:
				"I didn't realize the buttons were clickable at first. Hover effects would help make the UI feel more interactive and polished.",
			createdAt: new Date('2022-01-25T06:15:27'),
			issueId: issueIds[10],
			authorId: userIds[0],
		},
		{
			content:
				"Buttons on the homepage don't provide any hover feedback. It's hard to tell if I'm clicking on something sometimes.",
			createdAt: new Date('2022-06-10T13:25:53'),
			issueId: issueIds[10],
			authorId: userIds[2],
		},
		{
			content:
				"It's strange that the buttons don't change when hovering. A simple color change would help improve the user experience.",
			createdAt: new Date('2022-09-19T23:48:34'),
			issueId: issueIds[10],
			authorId: userIds[1],
		},
		{
			content:
				'I agree with others - hover effects are a simple but important detail. Without them, it feels like the app is missing basic interactivity.',
			createdAt: new Date('2023-02-07T10:22:44'),
			issueId: issueIds[10],
			authorId: userIds[0],
		},
		{
			content:
				'Hover effects are essential for UI feedback. I almost clicked on the wrong button because there was no visual cue that it was active.',
			createdAt: new Date('2023-06-14T18:30:08'),
			issueId: issueIds[10],
			authorId: userIds[1],
		},
		{
			content:
				'The mobile menu stays open after selecting an item, which is really annoying. It would be much better if it closed automatically.',
			createdAt: new Date('2021-09-22T17:14:59'),
			issueId: issueIds[11],
			authorId: userIds[2],
		},
		{
			content:
				"On mobile, after selecting a menu item, it doesn't close, so I have to manually close it. Can we fix that?",
			createdAt: new Date('2022-02-17T08:13:16'),
			issueId: issueIds[11],
			authorId: userIds[1],
		},
		{
			content:
				"I've noticed that the checkout page sometimes shows prices in USD when I'm in Europe. This makes it confusing to know the actual price.",
			createdAt: new Date('2021-09-24T12:59:42'),
			issueId: issueIds[12],
			authorId: userIds[0],
		},
		{
			content:
				"I've been staying logged in forever without being logged out. It's a security risk if sessions aren't timing out after a period of inactivity.",
			createdAt: new Date('2021-09-10T23:48:55'),
			issueId: issueIds[13],
			authorId: userIds[0],
		},
		{
			content:
				"The session timeout doesn't seem to be working. I can leave my computer for hours and still be logged in when I return.",
			createdAt: new Date('2021-12-02T18:24:15'),
			issueId: issueIds[13],
			authorId: userIds[1],
		},
		{
			content:
				"The session timeout isn't triggered after 15 minutes, as expected. This could be an issue for compliance if sensitive data is being handled.",
			createdAt: new Date('2022-03-26T07:31:23'),
			issueId: issueIds[13],
			authorId: userIds[2],
		},
		{
			content:
				'I left the site open overnight, and I was still logged in the next morning. The session should definitely time out after inactivity.',
			createdAt: new Date('2022-09-13T10:55:47'),
			issueId: issueIds[13],
			authorId: userIds[0],
		},
		{
			content:
				"This isn't just an inconvenience; it's a security concern. Session timeouts should be enforced for users who aren't active.",
			createdAt: new Date('2023-01-22T16:42:09'),
			issueId: issueIds[13],
			authorId: userIds[2],
		},
		{
			content:
				"I'm concerned that the session timeout feature is broken. No matter how long I leave the app inactive, I'm never logged out.",
			createdAt: new Date('2023-06-10T21:17:32'),
			issueId: issueIds[13],
			authorId: userIds[1],
		},
		{
			content:
				"Can we implement the session timeout for real? It's weird to stay logged in indefinitely, especially on shared devices.",
			createdAt: new Date('2023-11-05T13:58:07'),
			issueId: issueIds[13],
			authorId: userIds[0],
		},
		{
			content:
				'The password validation seems too lenient. It allows weak passwords that could easily be guessed. Can we enforce a stronger policy?',
			createdAt: new Date('2022-07-14T02:30:29'),
			issueId: issueIds[16],
			authorId: userIds[1],
		},
		{
			content:
				'I keep getting timeouts when trying to download files over 100MB. This is really frustrating, especially on slower internet connections.',
			createdAt: new Date('2023-03-22T11:27:02'),
			issueId: issueIds[18],
			authorId: userIds[2],
		},
		{
			content:
				"The download for large files always fails after a few minutes. It seems like the server isn't handling big files properly. Can this be fixed?",
			createdAt: new Date('2023-05-14T04:44:13'),
			issueId: issueIds[18],
			authorId: userIds[0],
		},
		{
			content:
				"When I try to download a large file, the connection is lost after a while. Can we implement a resume feature so I don't have to restart the download from scratch?",
			createdAt: new Date('2023-08-30T20:55:59'),
			issueId: issueIds[18],
			authorId: userIds[2],
		},
		{
			content:
				'Downloads are timing out on my end. I have a stable connection, but the large file keeps cutting off before it finishes. Can we extend the timeout for bigger files?',
			createdAt: new Date('2023-09-18T23:12:11'),
			issueId: issueIds[18],
			authorId: userIds[1],
		},
		{
			content:
				'The timeouts are a big issue when downloading large files. Is there a way to split the download into smaller chunks to prevent timeouts?',
			createdAt: new Date('2023-11-03T19:05:16'),
			issueId: issueIds[18],
			authorId: userIds[2],
		},
		{
			content:
				'It would be great if we could get a message about how much time is left or a way to resume the download if it gets interrupted.',
			createdAt: new Date('2024-01-17T10:29:39'),
			issueId: issueIds[18],
			authorId: userIds[0],
		},
		{
			content:
				'The inconsistent date formats are really confusing. Some reports show dates as MM/DD/YYYY, while others use DD/MM/YYYY. Can we standardize them?',
			createdAt: new Date('2023-06-23T09:52:21'),
			issueId: issueIds[19],
			authorId: userIds[1],
		},
		{
			content:
				'This issue is making it hard to compare reports. It would be much easier if we used ISO 8601 format across all reports.',
			createdAt: new Date('2023-07-15T16:41:07'),
			issueId: issueIds[19],
			authorId: userIds[0],
		},
	];

	// Create comments
	await prisma.comment.createMany({
		data: commentData,
	});

	console.log('Database has been seeded.');
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
