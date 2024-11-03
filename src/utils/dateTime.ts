export const getStringDate = async (dateTime: Date) => {
	const date = dateTime.toDateString();
	const hours = dateTime.getHours();
	const minutes = dateTime.getMinutes().toString().padStart(2, '0');
	return `${date}, ${hours}:${minutes}`;
};
