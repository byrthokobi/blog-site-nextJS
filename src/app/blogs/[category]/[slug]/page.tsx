import Image from "next/image";

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

    console.log(post.categories);

    const featuredImage = post.featuredImage
        ? `${url}${post.featuredImage.url}`
        : "/placeholder.jpg";
    const authorName = `${post.author?.firstName ?? ""} ${post.author?.lastName ?? ""
        }`.trim();
    const authorAvatar = post.author?.avatar
        ? `${url}${post.author.avatar.url}`
        : "/default-avatar.png";

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
        </article>
    );
}
