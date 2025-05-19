interface BlogCardType {
    authorName:string,
    title:string,
    content:string,
    publsihedDate:string
}

export const BlogCard = ({
    authorName,
    title,
    content,
    publsihedDate
}:BlogCardType) => {
    return (
        <div className="border-b border-slate-300 pb-4 p-4">
            <div className="flex items-center">
                <div className="flex  justify-center flex-col">
                    <Avatar name={authorName} />
                </div>
                <div className="font-extralight pl-2 text-sm">
                    {authorName} 
                </div>
                <div className="pl-2 text-[3px]">
                    &#9679;
                </div>
                <div className="pl-1 font-thin text-sm text-slate-600">
                {publsihedDate}
                </div>
            </div>
            <div className="text-2xl font-semibold pt-1">
                {title}
            </div>
            <div className="text-md text-slate-500">
                {content.length > 100 ? content.slice(0,100) + "..." : content}
            </div>
            <div className="text-[12px] text-gray-400 pt-2">
                {`${Math.ceil(content.length / 100)} min read`}
            </div>
        </div>
    )
}

const Avatar = ({name}:{name:string}) => {
    return (
        <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
    <span className="text-sm text-gray-600 dark:text-gray-300">{name[0].toUpperCase()}</span>
</div>
    )
}