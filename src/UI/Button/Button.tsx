import classes from "./Button.module.scss";

interface IButton {
  title: string;
  onClick: any;
}

function Button(props: IButton) {
  return (
    <button className={classes.button} onClick={props.onClick}>
      {props.title}
    </button>
  );
}

export default Button;
