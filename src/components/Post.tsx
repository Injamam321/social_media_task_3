import { Heart, MessageCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface PostType {
    id: string;
    sender: {
        id: string;
        name: string;
        avatar: string;
    };
    content: {
        text: string;
        media: { type: string; src: string }[];
    };
    timestamp: string;
    likes: number;
    comments: number;
}

interface PostProps {
    post: PostType;
    onImageClick: (index: number) => void;
}

export function Post({ post, onImageClick }: PostProps) {
    return (
        <div className="card">
            <div className="card-header bg-white d-flex align-items-center gap-3 border-bottom">
                <img
                    src={post.sender.avatar}
                    alt={post.sender.name}
                    className="rounded-circle"
                    width="40"
                    height="40"
                />
                <div>
                    <h6 className="mb-0">{post.sender.name}</h6>
                    <small className="text-muted">
                        Posted{" "}
                        {formatDistanceToNow(new Date(post.timestamp), {
                            addSuffix: true,
                        })}
                    </small>
                </div>
            </div>
            <div className="card-body">
                <p className="card-text">{post.content.text}</p>
                <div className="d-flex gap-2 flex-wrap">
                    {post.content.media.map((media, index) => (
                        <img
                            key={index}
                            src={media.src}
                            alt={`Media ${index + 1}`}
                            className="img-fluid rounded"
                            onClick={() => onImageClick(index)} // Pass index
                            style={{ cursor: "pointer", maxWidth: "150px" }}
                        />
                    ))}
                </div>
            </div>
            <div className="card-footer bg-white border-top">
                <div className="d-flex gap-4">
                    <button className="btn btn-link text-decoration-none text-muted p-0">
                        <Heart className="me-2" />
                        {post.likes}
                    </button>
                    <button className="btn btn-link text-decoration-none text-muted p-0">
                        <MessageCircle className="me-2" />
                        {post.comments} Comments
                    </button>
                </div>
            </div>
        </div>
    );
}
