const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, item) => sum + item.likes, 0)
}

const favouriteBlog = (blogs) => {
    return blogs.length === 0
        ? []
        : blogs
            .map(blog => {
                return { title: blog.title, author: blog.author, likes: blog.likes }
            })
            .reduce((prev, current) => {
                return prev.likes > current.likes ? prev : current
            })
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}