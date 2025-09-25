import Image from "next/image";


interface Author {
    firstName?: string;
    lastName?: string;
    avatar?: {
        url: string;
    };
}


interface Comment {
    id: string;
    content: string;
    createdAt: string;
    author?: Author;
}

interface CommentsResponse {
    docs: Comment[];
}

export default async function BlogPostPage({ params }: { params: { category: string; slug: string } }) {
    const { category, slug } = await params;
    const slugParts = slug.split("-");
    const id = slugParts[slugParts.length - 1];

    console.log("id: " + id);

    const url = process.env.BASE_URL;
    const data = await fetch(`${url}/api/posts/${id}`);
    const post = await data.json();

    const title = post.title;
    const publishedAt = new Date(post.publishedAt).toLocaleDateString();
    const categoryName = category.toUpperCase();
    const content = post.content?.root?.children?.[0]?.children?.[0]?.text ?? "";

    const featuredImage = post.featuredImage
        ? `${url}${post.featuredImage.url}`
        : "/placeholder.jpg";
    const authorName = `${post.author?.firstName ?? ""} ${post.author?.lastName ?? ""
        }`.trim();
    const authorAvatar = post.author?.avatar
        ? `${url}${post.author.avatar.url}`
        : "/default-avatar.png";

    const commentsRes = await fetch(
        `${url}/api/comments?where[post][equals]=${id}`,
        { cache: "no-store" }
    );
    const commentsData: CommentsResponse = await commentsRes.json();

    console.log(commentsData);

    const comments = commentsData.docs.map((c) => ({
        id: c.id,
        author: `${c.author?.firstName ?? "Anonymous"} ${c.author?.lastName ?? ""}`.trim(),
        content: c.content,
        createdAt: new Date(c.createdAt).toLocaleString(),
        avatar: c.author?.avatar?.url
            ? `${url}${c.author.avatar.url}`
            : "/default-avatar.png",
    }));

    return (
        <article className="max-w-4xl mx-auto p-6">
            <div className="relative w-full h-80 mb-6">
                <Image
                    src={featuredImage}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover rounded-xl"
                    priority
                />
            </div>

            <h1 className="text-3xl font-bold mb-4">{title}</h1>

            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-2">
                    <Image
                        src={authorAvatar}
                        alt={authorName}
                        width={32}
                        height={32}
                        className="rounded-full w-8 h-8 object-cover"
                    />
                    <span>{authorName}</span>
                </div>
                • <span>{publishedAt}</span> • <span>{categoryName}</span>
            </div>

            {/* Blog Content */}
            <div className="prose prose-lg max-w-none text-justify">
                <p>{content}</p>
            </div>


            <div className="relative flex items-center my-10">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="px-4 text-gray-500 text-sm">The End</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className="max-w-3xl mx-auto p-6">
                <h3 className="text-2xl font-bold mb-6">Comments ({comments.length})</h3>

                {/* Comment Form */}
                <div className="mb-8 border-b pb-6">
                    <textarea
                        placeholder="Add a comment..."
                        className="w-full p-3 border border-gray-300 rounded mb-3 focus:outline-none focus:border-gray-600"
                    />
                    <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
                        Post Comment
                    </button>
                </div>

                {/* Comments */}
                <div className="space-y-6">
                    {comments.map(comment => (
                        <div key={comment.id} className="border-b pb-4">
                            <div className="flex items-center mb-2">
                                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white text-sm mr-3">
                                    {comment.author.charAt(0)}
                                </div>
                                <span className="font-medium">{comment.author}</span>
                                <span className="text-gray-500 text-sm ml-2">{comment.createdAt}</span>
                            </div>
                            <p className="text-gray-800 ml-11">{comment.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </article>
    );
}
