import { useUpdateReactionMutation } from "../api/apiSlice";

const ReactionButton = ({ blog, small }) => {
  const [updateReaction] = useUpdateReactionMutation();

  const reactions = {
    like: "👍",
    dislike: "👎",
    heart: "❤",
    hora: "🎉",
    laugh: "🤣",
    clap: "👏",
  };

  const handleReaction = (reactionName) => {
    const updatedBlog = {
      ...blog,
      reactions: {
        ...blog.reactions,
        [reactionName]: (blog.reactions[reactionName] || 0) + 1,
      },
    };

    updateReaction({ blog: updatedBlog });
  };

  return (
    <>
      {Object.entries(reactions).map(([name, emoji]) => (
        <button
          key={name}
          type="button"
          className={`muted-button reaction-button ${
            small ? "p-1 text-sm" : "p-2 text-base"
          }`}
          onClick={() => handleReaction(name)}
        >
          {emoji} {blog.reactions[name] || 0}
        </button>
      ))}
    </>
  );
};

export default ReactionButton;
