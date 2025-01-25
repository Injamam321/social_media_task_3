import { posts } from "../data";

interface UserListProps {
    selectedUser: string | null;
    onUserSelect: (userId: string | null) => void;
    onFriendSelect: (friendId: string) => void;
}
export function UserList({ selectedUser, onUserSelect }: UserListProps) {
    return (
        <div className="bg-white rounded shadow-sm p-4">
            <h2 className="h5 mb-4">Friends</h2>
            <div className="list-group">
                {posts.map((user) => (
                    <button
                        key={user.id}
                        className={`list-group-item list-group-item-action d-flex align-items-center gap-3 ${selectedUser === user.id ? "active" : ""}`}
                        onClick={() =>
                            onUserSelect(selectedUser === user.id ? null : user.id)
                        }
                    >
                        <img
                            src={user.sender.avatar}
                            alt={user.sender.name}
                            className="rounded-circle"
                            width="32"
                            height="32"
                        />
                        {user.sender.name}
                    </button>
                ))}
            </div>
        </div>
    );
}
