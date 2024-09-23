import "./shimmer.css";

const Shimmer = ({ height = 60, radius = 10, width = 60, percentWidth = "" }) => {
    return (
        <div className="shimmerContainer" style={{
            width: percentWidth !== "" ? percentWidth : `${ width }px`
        }}>
            <div className="shimmerBox" style={{
                height: `${ height }px`,
                borderRadius: `${ radius }px`,
                width: percentWidth !== "" ? "100%" : `${ width }px`
            }}></div>
        </div>
    )
}

export default Shimmer;