import { useState } from "react";
import { Post } from "./Post";
import { posts } from "../data";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface FeedProps {
    searchQuery: string;
    selectedUser: string | null;
    selectedFriend: string | null;
}

export function Feed({ searchQuery, selectedUser, selectedFriend }: FeedProps) {
    const [lightboxImages, setLightboxImages] = useState<string[]>([]);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

    const openLightbox = (images: string[], index: number) => {
        setLightboxImages(images);
        setCurrentImageIndex(index);
    };

    const closeLightbox = () => {
        setLightboxImages([]);
        setCurrentImageIndex(0);
    };

    const handleNext = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % lightboxImages.length);
    };

    const handlePrevious = () => {
        setCurrentImageIndex(
            (prevIndex) => (prevIndex - 1 + lightboxImages.length) % lightboxImages.length,
        );
    };

    const handleThumbnailClick = (index: number) => {
        setCurrentImageIndex(index);
    };

    const filteredPosts = posts.filter(
        (post) =>
            (!selectedUser || post.id === selectedUser) &&
            (!selectedFriend || post.sender.id === selectedFriend) &&
            (!searchQuery ||
                post.content.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.sender.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="d-flex flex-column gap-4">
            <p className=" lead fs-2 mb-0">Media Feeds</p>
            {filteredPosts.map((post) => (
                <Post
                    key={post.id}
                    post={post}
                    onImageClick={(index) =>
                        openLightbox(post.content.media.map((media) => media.src), index)
                    }
                />
            ))}

            {lightboxImages.length > 0 && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center bg-black bg-opacity-75"
                    style={{ zIndex: 1000 }}
                >
                    {/* Close Button */}
                    <button
                        className="btn btn-outline-info border-0 rounded-5 position-absolute top-0 end-0 me-5 mt-5"
                        onClick={closeLightbox}
                    >
                        <X size={50} />
                    </button>

                    {/* Main Image */}
                    <div className="d-flex align-items-center justify-content-center">
                        <button className="btn btn-outline-info me-3" onClick={handlePrevious}>
                            <ChevronLeft />
                        </button>
                        <img
                            src={lightboxImages[currentImageIndex]}
                            alt="Lightbox"
                            className="img-fluid"
                            style={{
                                maxWidth: "80%",
                                maxHeight: "80%",
                                objectFit: "contain",
                            }}
                        />
                        <button className="btn btn-outline-info ms-3" onClick={handleNext}>
                            <ChevronRight />
                        </button>
                    </div>

                    {/* Thumbnails */}
                    <div className="d-flex gap-2 mt-3 overflow-x-auto">
                        {lightboxImages.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Thumbnail ${index + 1}`}
                                className={`img-thumbnail ${currentImageIndex === index ? "border-primary border-3" : ""}`}
                                style={{
                                    cursor: "pointer",
                                    width: "75px",
                                    height: "75px",
                                    objectFit: "cover",
                                }}
                                onClick={() => handleThumbnailClick(index)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
