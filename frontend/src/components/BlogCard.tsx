import { Link } from "react-router-dom"

interface BlogCardType {
    authorName:string,
    title:string,
    content:string,
    publsihedDate?:string,
    id:number
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publsihedDate
}:BlogCardType) => {
    return (
        <Link to={`/blog/${id}`}>
        <div className="border-b border-slate-300 pb-4 p-4 w-screen max-w-screen-md">
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
        </Link>
    )
}

export const Avatar = ({name,size="small"}:{name:string,size?: "small" | "big"}) => {
    return (
        <div className={`relative inline-flex items-center justify-center ${size == "small" ? "w-6 h-6" : "w-[35px] h-[35px]"}  overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
    <span className="text-sm text-gray-600 dark:text-gray-300 ">{name[0].toUpperCase()}</span>
</div>
    )
}