const MyBtn = ({ onClick, className,label  }) => {
    return (
        <button onClick={onClick} type="button" className={className}>
            {label}
        </button>
    );
    }

export default MyBtn;