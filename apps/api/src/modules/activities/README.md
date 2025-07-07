# Activities and User Stats System

This module provides a comprehensive activity tracking and user statistics system for the Q&A platform.

## Features

### Activity Tracking

- **Comprehensive Activity Types**: Tracks 15 different activity types including questions, answers, comments, votes, edits, badges, and more
- **Metadata Support**: Each activity can include rich metadata for context
- **Automatic Stats Updates**: Activities automatically update user statistics and reputation
- **Transaction Safety**: All operations use database transactions for data consistency

### User Statistics

- **Reputation System**: Points-based reputation system with different values for different activities
- **Activity Counters**: Tracks counts for questions, answers, comments, votes, and tags
- **Badge System**: Supports gold, silver, and bronze badges
- **Last Active Tracking**: Automatically updates user's last active timestamp

### API Endpoints

#### Activities

- `POST /activities` - Track a new activity
- `GET /activities/user/:userId` - Get user's activities with pagination
- `GET /activities/type/:type` - Get activities by type
- `GET /activities/recent` - Get recent activities
- `GET /activities/:id` - Get specific activity
- `DELETE /activities/:id` - Delete activity (owner only)
- `GET /activities/stats/:userId` - Get activity statistics for user

#### User Stats

- `GET /users-stats/user/:userId` - Get user statistics
- `GET /users-stats/user/:userId/with-user` - Get stats with user details
- `GET /users-stats/top` - Get top users by reputation
- `POST /users-stats/create/:userId` - Create stats for user (admin only)
- `POST /users-stats/reputation/:userId` - Update reputation points
- `POST /users-stats/badges/:userId` - Update badges (admin only)

## Activity Types and Reputation Points

| Activity Type | Reputation Points | Description             |
| ------------- | ----------------- | ----------------------- |
| Question      | +5                | Creating a new question |
| Answer        | +10               | Providing an answer     |
| Comment       | +2                | Adding a comment        |
| Vote          | +1                | Voting on content       |
| Edit          | +2                | Editing content         |
| Delete        | -2                | Deleting content        |
| Accept        | +15               | Accepting an answer     |
| Tag           | +3                | Creating a tag          |
| Follow        | +1                | Following a user        |
| Bookmark      | +1                | Bookmarking content     |
| Share         | +1                | Sharing content         |
| Registration  | +1                | User registration       |

## Usage Examples

### Tracking a Question Activity

```typescript
await activitiesService.trackActivity(userId, ActivityType.Question, {
  questionId: 123,
  title: 'How to implement authentication?',
});
```

### Tracking a Badge Award

```typescript
await activitiesService.trackActivity(userId, ActivityType.Badge, {
  badgeType: 'gold',
  count: 1,
  reason: 'First accepted answer',
});
```

### Getting User Stats

```typescript
const stats = await usersStatsService.getUserStats(userId);
console.log(`Reputation: ${stats.reputation}`);
console.log(`Questions: ${stats.questionsCount}`);
```

## Database Schema

### Activity Entity

- `id`: Primary key
- `user`: User who performed the activity
- `type`: Activity type enum
- `metadata`: JSON field for additional context
- `createdAt`: Timestamp

### UsersStats Entity

- `id`: Primary key
- `user`: Associated user
- `questionsCount`: Number of questions asked
- `answersCount`: Number of answers provided
- `commentsCount`: Number of comments made
- `votesCount`: Number of votes cast
- `tagsCount`: Number of tags created
- `reputation`: Total reputation points
- `badgeGold`: Number of gold badges
- `badgeSilver`: Number of silver badges
- `badgeBronze`: Number of bronze badges
- `lastActiveAt`: Last activity timestamp

## Integration

The system automatically integrates with:

- **User Registration**: Creates stats and tracks registration activity
- **OAuth Registration**: Tracks OAuth provider information
- **Question/Answer System**: Can be called when questions/answers are created
- **Voting System**: Tracks upvotes/downvotes
- **Badge System**: Manages badge awards and counts

## Security

- All endpoints require authentication
- Role-based access control for admin operations
- Users can only modify their own activities and stats
- Input validation using DTOs
- Transaction safety for data consistency
