import Assets from "../assets/Assets"

const Loader = ({width = 40, height = 40}) => {
    return (
        <img
            alt="verifying"
            src={ Assets.loading }
            width={ width }
            height={ height }
            style={{"objectFit": "cover"}}
        />
    )
}

export default Loader