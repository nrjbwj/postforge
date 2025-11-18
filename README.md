# PostForge

A modern, full-featured post management application built with Next.js, Material-UI, and TypeScript. PostForge provides an intuitive interface for creating, viewing, editing, and managing posts with a beautiful dashboard and comprehensive CRUD operations.

## Features

- 📊 **Dashboard** - View metrics including total posts, active users, and engagement statistics
- 📝 **Post Management** - Create, read, update, and delete posts
- 💬 **Comments** - View comments for each post
- 🔍 **Search & Filter** - Search through posts with real-time filtering
- 📄 **Pagination** - Navigate through posts with paginated views
- 🎨 **Theme Support** - Light and dark mode themes
- 📱 **Responsive Design** - Fully responsive UI that works on all devices
- ⚡ **Fast Performance** - Optimized with React Query for efficient data fetching and caching

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Library**: [Material-UI (MUI)](https://mui.com/)
- **Data Fetching**: [TanStack Query (React Query)](https://tanstack.com/query)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Notifications**: [Notistack](https://notistack.com/)
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Containerization**: [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

## Prerequisites

### For Local Development
- Node.js 20 or higher
- pnpm (install via `npm install -g pnpm` or `corepack enable`)

### For Docker Deployment
- [Docker](https://www.docker.com/get-started) (version 20.10 or higher)
- [Docker Compose](https://docs.docker.com/compose/install/) (version 2.0 or higher)

## Getting Started

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd postforge
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables** (optional)
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_BASE_URL=https://jsonplaceholder.typicode.com
   NEXT_PUBLIC_DEFAULT_THEME=light
   NEXT_PUBLIC_POSTS_PER_PAGE=10
   NEXT_PUBLIC_DEFAULT_USER_ID=1
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Production Build

1. **Build the application**
   ```bash
   pnpm build
   ```

2. **Start the production server**
   ```bash
   pnpm start
   ```

## Docker Deployment

PostForge can be deployed using Docker for a consistent, production-ready environment. The Docker setup uses a multi-stage build for optimal image size and performance.

### Prerequisites

- Docker and Docker Compose installed
- `.env.local` file with your environment variables (optional, defaults will be used if not provided)

### Quick Start with Docker Compose

1. **Create `.env.local` file** (optional)
   
   Create a `.env.local` file in the root directory with your environment variables:
   ```env
   NEXT_PUBLIC_API_BASE_URL=https://jsonplaceholder.typicode.com
   NEXT_PUBLIC_DEFAULT_THEME=light
   NEXT_PUBLIC_POSTS_PER_PAGE=10
   NEXT_PUBLIC_DEFAULT_USER_ID=1
   NEXT_PUBLIC_QUERY_STALE_TIME=60000
   NEXT_PUBLIC_QUERY_RETRY=1
   NEXT_PUBLIC_SNACKBAR_MAX_SNACK=3
   NEXT_PUBLIC_SNACKBAR_AUTO_HIDE_DURATION=3000
   PORT=3000
   ```

   **Note:** The `PORT` variable controls the external port mapping. If port 3000 is occupied, set `PORT=3001` (or any available port) in your `.env.local` file.

2. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

   Or specify a custom port:
   ```bash
   PORT=3001 docker-compose up --build
   ```

   This will:
   - Build the Docker image with all dependencies
   - Start the container with production optimizations
   - Make the app available at `http://localhost:${PORT:-3000}` (defaults to 3000)

3. **Run in detached mode** (background)
   ```bash
   docker-compose up -d --build
   ```

4. **View logs**
   ```bash
   docker-compose logs -f
   ```

5. **Stop the container**
   ```bash
   docker-compose down
   ```

### Using Docker Directly

If you prefer to use Docker commands directly:

1. **Build the image**
   ```bash
   docker build -t postforge .
   ```

2. **Run the container**
   ```bash
   # Using default port 3000
   docker run -p 3000:3000 --env-file .env.local postforge
   
   # Using custom port (e.g., 3001)
   docker run -p 3001:3000 --env-file .env.local postforge
   ```

   Or pass environment variables directly:
   ```bash
   docker run -p 3000:3000 \
     -e NEXT_PUBLIC_API_BASE_URL=https://jsonplaceholder.typicode.com \
     -e NEXT_PUBLIC_DEFAULT_THEME=light \
     postforge
   ```

3. **Run in detached mode**
   ```bash
   # Default port 3000
   docker run -d -p 3000:3000 --name postforge --env-file .env.local postforge
   
   # Custom port 3001
   docker run -d -p 3001:3000 --name postforge --env-file .env.local postforge
   ```

4. **View logs**
   ```bash
   docker logs -f postforge
   ```

5. **Stop and remove container**
   ```bash
   docker stop postforge
   docker rm postforge
   ```

### Docker Image Details

- **Base Image**: `node:20-alpine` (lightweight Alpine Linux)
- **Multi-stage Build**: Optimized for production with minimal image size
- **Security**: Runs as non-root user (`nextjs`)
- **Port**: Exposes port 3000
- **Health Check**: Built-in health check for container orchestration

### Environment Variables in Docker

Environment variables are loaded from `.env.local` automatically when using Docker Compose. For `NEXT_PUBLIC_*` variables, they are embedded at build time for optimal performance.

**Build-time variables** (embedded in the Next.js build):
- `NEXT_PUBLIC_API_BASE_URL`
- `NEXT_PUBLIC_DEFAULT_THEME`
- `NEXT_PUBLIC_POSTS_PER_PAGE`
- `NEXT_PUBLIC_QUERY_STALE_TIME`
- `NEXT_PUBLIC_QUERY_RETRY`
- `NEXT_PUBLIC_DEFAULT_USER_ID`
- `NEXT_PUBLIC_SNACKBAR_MAX_SNACK`
- `NEXT_PUBLIC_SNACKBAR_AUTO_HIDE_DURATION`

**Runtime variables**:
- `NODE_ENV` (automatically set to `production`)

### Dynamic Port Configuration

The external port can be configured to avoid conflicts with other services:

**Using Docker Compose:**
```bash
# Set PORT in .env.local file
PORT=3001

# Or pass it as an environment variable
PORT=3001 docker-compose up --build
```

**Using Docker directly:**
```bash
# Map to a different external port
docker run -p 3001:3000 --env-file .env.local postforge
```

**Using Makefile:**
```bash
# Use PORT environment variable
PORT=3001 make docker-up-build
```

The internal container port remains 3000 (Next.js default), but the external port can be any available port on your host.

### Troubleshooting

**Port already in use:**
```bash
# Option 1: Set PORT in .env.local
echo "PORT=3001" >> .env.local
docker-compose up --build

# Option 2: Use PORT environment variable
PORT=3001 docker-compose up --build

# Option 3: Use Makefile with PORT
PORT=3001 make docker-up-build

# Option 4: Use Docker directly with custom port
docker run -p 3001:3000 --env-file .env.local postforge
```

**Build fails:**
- Ensure Docker has enough memory allocated (recommended: 4GB+)
- Clear Docker cache: `docker builder prune`

**Container won't start:**
- Check logs: `docker-compose logs` or `docker logs postforge`
- Verify `.env.local` file exists and has correct format
- Ensure port 3000 is not in use by another application

## Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint to check code quality

## Makefile Commands

PostForge includes a Makefile for convenient command execution. Use `make help` to see all available commands.

### Development Commands
```bash
make install          # Install dependencies
make dev              # Start development server
make build            # Build for production
make start            # Start production server
make lint             # Run ESLint
make clean            # Clean build artifacts
```

### Docker Commands
```bash
make docker-build          # Build Docker image
make docker-up             # Start containers (PORT=3001 for custom port)
make docker-up-build       # Build and start containers (PORT=3001 for custom port)
make docker-down           # Stop containers
make docker-logs           # View container logs
make docker-restart        # Restart containers
make docker-clean          # Clean Docker resources
make docker-full           # Full Docker setup (build + start)
make docker-run            # Run container directly (PORT=3001 for custom port)
```

**Using custom ports with Makefile:**
```bash
PORT=3001 make docker-up-build  # Start on port 3001
PORT=8080 make docker-run       # Run on port 8080
```

### Utility Commands
```bash
make help            # Show all available commands
make check-env       # Check/create .env.local file
make status          # Show Docker container status
make info            # Show project information
```

### Quick Start Examples
```bash
# Setup and start development
make setup && make dev

# Full Docker setup
make docker-full

# Clean rebuild
make rebuild

# Clean Docker rebuild
make docker-rebuild
```

## Project Structure

```
postforge/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── page.tsx           # Dashboard page
│   │   └── posts/             # Post-related pages
│   │       ├── page.tsx       # Posts list
│   │       ├── new/           # Create post
│   │       └── [id]/          # Post detail & edit
│   ├── components/            # React components
│   │   ├── common/           # Reusable UI components
│   │   ├── dashboard/        # Dashboard-specific components
│   │   ├── data-display/     # Data table components
│   │   ├── forms/            # Form components
│   │   ├── layout/           # Layout components
│   │   └── posts/            # Post-specific components
│   ├── config/               # Configuration files
│   ├── contexts/             # React contexts
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility libraries
│   │   └── api/             # API client functions
│   ├── providers/            # React providers
│   └── types/                # TypeScript type definitions
├── docker-compose.yml        # Docker Compose configuration
├── Dockerfile               # Production Dockerfile (multi-stage build)
├── .dockerignore           # Docker build context exclusions
├── Makefile                # Makefile with common commands
└── package.json             # Project dependencies
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | Base URL for the API | `https://jsonplaceholder.typicode.com` |
| `NEXT_PUBLIC_DEFAULT_THEME` | Default theme (light/dark) | `light` |
| `NEXT_PUBLIC_POSTS_PER_PAGE` | Number of posts per page | `10` |
| `NEXT_PUBLIC_DEFAULT_USER_ID` | Default user ID for new posts | `1` |
| `NEXT_PUBLIC_QUERY_STALE_TIME` | React Query stale time (ms) | `60000` |
| `NEXT_PUBLIC_QUERY_RETRY` | React Query retry count | `1` |
| `NEXT_PUBLIC_SNACKBAR_MAX_SNACK` | Maximum snackbar notifications | `3` |
| `NEXT_PUBLIC_SNACKBAR_AUTO_HIDE_DURATION` | Snackbar auto-hide duration (ms) | `3000` |
| `PORT` | External port for Docker container | `3000` |

## API Integration

PostForge integrates with the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/) by default, which provides a fake REST API for testing and prototyping. You can configure a different API endpoint by setting the `NEXT_PUBLIC_API_BASE_URL` environment variable.

### Supported API Endpoints

- `GET /posts` - Fetch all posts
- `GET /posts/:id` - Fetch a single post
- `POST /posts` - Create a new post
- `PUT /posts/:id` - Update a post
- `DELETE /posts/:id` - Delete a post
- `GET /posts/:id/comments` - Fetch comments for a post

## Features in Detail

### Dashboard
- Real-time metrics display
- Quick action buttons for common tasks
- Recent activity feed

### Post Management
- **List View**: Browse all posts with pagination and search
- **Detail View**: View full post content and comments
- **Create**: Add new posts with a user-friendly form
- **Edit**: Update existing posts
- **Delete**: Remove posts with confirmation dialog

### User Experience
- Loading states and error handling
- Toast notifications for user actions
- Responsive navigation
- Theme switching (light/dark mode)
- Empty states for better UX

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is private and proprietary.

## Support

For issues, questions, or suggestions, please open an issue in the repository.
