# Issue Tracker

Issue Tracker is a fast and responsive web application designed for efficient issue management. It allows users to create, manage, and track issues, with real-time updates on their statuses, assignments, and detailed information. Built with a modern tech stack, Issue Tracker offers a seamless and intuitive experience for teams and individual users who need a reliable way to track issues and collaborate effectively.

## Key Features

### Dashboard

-   **Statistics Overview:** The dashboard provides a quick overview of issue statistics, offering insights into the status and distribution of issues across different categories.
-   **Chart Visualizations:** View key metrics and trends through clear and informative charts.

### Issues Management

-   **All Issues View:** Browse all issues with the option to filter by status or assignee and sort by title, status, or creation date in ascending or descending order.
-   **Pagination and Customizable Page Size:** Navigate through issue lists efficiently, with customizable pagination for an optimal viewing experience.
-   **CRUD Operations:** Create, read, update, and delete issues with a streamlined interface. Users can:
    -   **Add New Issues:** Include titles and descriptions using a markdown editor for rich text formatting.
    -   **Edit and Update Issues:** Modify titles, descriptions, statuses and assignments.
    -   **Delete Issues:** Remove issues as needed.

### Issue Details

-   **Detailed View:** Access full details of each issue, including title, description, and comments.
-   **Commenting System:** Users can add comments to issues, facilitating communication and discussion within the team.

### User Management and Authentication

-   **User Authentication and Authorization:** Users can log in using Google, GitHub, Facebook, or credentials-based accounts.
-   **Account Activation via Email:** Secure registration with account activation links sent to users' emails.
-   **Permissions Control:** Only logged-in users can add, edit, assign, or delete issues, ensuring data integrity and access control.

### Additional Functionalities

-   **Filtering and Sorting:** Advanced filtering and sorting options to organize and view issues based on specific criteria.
-   **Form Validation:** Both client- and server-side validation for a smooth user experience.
-   **Modal Dialogs and Toast Notifications:** Responsive dialogs and real-time feedback for actions like saving, editing, or deleting data.
-   **Markdown Support:** View and edit descriptions in markdown format.

## Technology Stack

Issue Tracker is built with the following tools and frameworks to ensure a robust, scalable, and modern application:

-   [**Next.js**](https://nextjs.org/) for a powerful, server-rendered React framework.
-   [**TypeScript**](https://www.typescriptlang.org/) for type-safe JavaScript development.
-   [**Tailwind CSS**](https://tailwindcss.com/) for a highly customizable UI.
-   [**Radix UI**](https://www.radix-ui.com/) for fast development and accessible components.
-   [**NextAuth**](https://next-auth.js.org/) for secure, versatile authentication.
-   **[Prisma](https://www.prisma.io/) and [PostgreSQL](https://www.postgresql.org.pl/)** for robust and efficient data handling.
-   [**Sentry**](https://sentry.io/) for comprehensive issue tracking and error monitoring.
-   [**Docker**](https://www.docker.com/) for containerized deployment of the application and database, ensuring consistency across environments.

## Getting Started

### Prerequisites

-   **Docker** (recommended) for containerized setup of the application and database.

    **OR**

-   **Node.js** and **npm** installed on your machine for running the app directly.
-   **PostgreSQL** database.

### Setup Instructions

1. **Clone the Repository**

    ```bash
    git clone https://github.com/ArtoszBart/issue-tracker.git
    cd issue-tracker
    ```

2. **Configure Environment Variables**

    - Create a `.env` file in the root directory.
    - Set up the necessary environment variables (see **Environment Variables** section below for details).

---

### Option 1: Setup with Docker (Recommended)

1. **Start the Application and Database:**

    ```bash
    docker-compose -f docker-compose.demo.yml up
    ```

    This step will start both the app and the PostgreSQL database in containers, applies migrations to your database, and populates the database with dummy data.

> [!NOTE]  
> This command may take longer the first time it runs, as it needs to download and build the required Docker images.

2. **Access the Application:**  
   Open http://localhost:3000 in your browser to view the app.

    Now that everything is set up, you can access the application running locally on your machine at this URL.

---

### Option 2: Setup with Node.js and npm

1. **Start PostgreSQL Database:**

    - Ensure PostgreSQL is running and the connection details in .env file match your database configuration.

    If you are not using Docker, you will need to manually start PostgreSQL. Make sure your `.env` file has the correct database connection settings.

2. **Install Dependencies:**

    ```bash
    npm install
    ```

    This command installs all the necessary dependencies listed in the `package.json` file, which are required to run the application.

3. **Build the Application:**

    ```bash
    npm run build
    ```

    This step compiles and optimizes the Next.js application for production. It generates the necessary static assets and server-side code to ensure fast and efficient rendering in production environments. Additionally, it compiles the `prisma/seed.ts` file, which is required to seed the database with dummy data.

4. **Run Database Migrations:**

    ```bash
    npx prisma migrate dev
    ```

    This applies Prisma migrations to your database, ensuring your schema is updated to reflect any changes.

5. **Seed the Database with Dummy Data:**

    ```bash
    node prisma/seed.js
    ```

    This step populates the database with dummy data for testing purposes. This will help simulate a real-world environment for the application.

> [!TIP]  
> You can skip this step if you do not want any dummy data in the database.

6. **Start the Application:**

    - **For Development Environment:**

        ```bash
        npm run dev
        ```

        This command starts the application in development mode, enabling features like hot reloading and detailed error messages.

    - **For Production Environment:**

        ```bash
        npm run start
        ```

        This command starts the application in production mode, serving the optimized build generated during the `npm run build` step. It ensures better performance and stability for production use.

7. **Access the Application:**

    Open http://localhost:3000 in your browser to view the app.

    You can now view the app running locally at this URL.

> [!NOTE]  
> If you don't want to create a new account but still want to test the application, you can log in using the example credentials created during the database seeding process:
>
> -   Email: john.doe@example.com
> -   Password: password

> [!IMPORTANT]  
> Logging in with example credentaials will only work if you have completed the **Seed the Database with Dummy Data** step

### Environment Variables

-   **Application Settings**:

    -   `BASE_URL`: Base URL of the application, e.g., `http://localhost:3000` for local development.

-   **Database**:

    -   `DATABASE_URL`: Connection string for the PostgreSQL database. This is relevant only for the setup **using Node.js and npm** (not Docker).

-   **NextAuth Configuration**:

    -   `NEXTAUTH_SECRET`: A secure random string used to sign and encrypt cookies. This can be any random string, but it's recommended to generate it using `openssl rand -base64 32` command.

    -   `NEXTAUTH_URL`: URL of the app, e.g., `http://localhost:3000` for local development.

-   **OAuth Provider Credentials** (for social login):

    -   `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`: Google OAuth credentials. You can find detailed instructions for obtaining these credentials by visiting the [NextAuth Google provider documentation](https://next-auth.js.org/providers/google).
    -   `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`: GitHub OAuth credentials. You can find detailed instructions for obtaining these credentials by visiting the [NextAuth GitHub provider documentation](https://next-auth.js.org/providers/github).
    -   `FACEBOOK_CLIENT_ID` and `FACEBOOK_CLIENT_SECRET`: Facebook OAuth credentials. You can find detailed instructions for obtaining these credentials by visiting the [NextAuth Facebook provider documentation](https://next-auth.js.org/providers/facebook).

-   **Email Configuration**:

    -   `EMAIL_HOST`: SMTP server for sending activation emails.
    -   `RESEND_API_KEY`: API key for the Resend service for email handling. To obtain the API key, follow the **Prerequisites** section in the [Resend documentation for Next.js](https://resend.com/docs/send-with-nextjs).

-   **Security Configuration**:

    -   `HASH_ROUNDS`: Number of rounds for hashing passwords and activation tokens. This value determines the computational cost of hashing. A higher number of rounds makes the hashing more secure but slower. Typical values range from `10` to `12`. For testing, you can leave it at the default value from `.env.example` file.

-   **Sentry Configuration** (for issue tracking):
    -   `SENTRY_DSN`: Sentry Data Source Name for connecting to the Sentry project. You can obtain this by signing up at [Sentry](https://sentry.io/) and creating a new project.
    -   `SENTRY_AUTH_TOKEN`: Authentication token for secure Sentry integration. You can generate this token from your [Sentry account settings](https://sentry.io/settings/account/api/).
