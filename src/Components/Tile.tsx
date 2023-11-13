import "./Tile.css";

interface TileProps {
	imageLink: string;
	text: string;
	routing: string;
}

const Tile = (props: TileProps) => {
	return (
		<div className="Tile">
			<a href={props.routing}>
				<h1>{props.text}</h1>
				<img src={props.imageLink} alt="Tile" />
			</a>
		</div>
	);
};

export default Tile;
