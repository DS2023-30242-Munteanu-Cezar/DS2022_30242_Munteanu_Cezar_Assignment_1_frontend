import utcn from "../../assets/images/utcn.png";
import eye from "../../assets/images/eye-solid.svg";
import eye_slash from "../../assets/images/eye-slash-solid.svg";
import trash from "../../assets/images/trash-solid.svg";
import x from "../../assets/images/x-solid.svg";
import update from "../../assets/images/update.svg";
import plus from "../../assets/images/plus-solid.svg";


interface IconComponent{
    type: string;
    onClick?: any;
}

const Icon: React.FC<IconComponent> = (props: IconComponent): JSX.Element =>{
    let icon: JSX.Element = <></>;
    
    switch(props.type){
        case "utcn":
            icon = <img src={utcn} alt = "utcn-logo" className="utcn-logo"></img>
            break;
        case "eye":
            icon = <img src={eye} alt = "eye" className="eye" onClick={props.onClick}></img>
            break;
        case "eye_slash":
            icon = <img src={eye_slash} alt="eye_slash" onClick={props.onClick} className="eye_slash"></img>
            break;
        case "trash":
                icon = <img src={trash} alt="trash" onClick={props.onClick} className="trash"></img>
                break;
        case "x":
                icon = <img src={x} alt="x" onClick={props.onClick} className="x"></img>
                break;
        case "update":
                icon = <img src={update} alt="update" onClick={props.onClick} className="update"></img>
                break;
        case "plus":
                icon = <img src={plus} alt="plus" onClick={props.onClick} className="plus"></img>
                break;
        default:
            break;
    }

    return icon;
}


export default Icon;