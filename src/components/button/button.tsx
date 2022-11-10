import "./button.scss";

interface ButtonComponent{
    type?: string;
    name?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonComponent> = (props: ButtonComponent):JSX.Element => {
    return <>
        <button onClick={props.onClick} type="submit" className="button_main">{props.name}</button>
    </>;
}

export default Button;