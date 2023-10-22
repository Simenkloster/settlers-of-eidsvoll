interface AddPlayerProps {
	onScoreChange(poeng: number): void;
	onPlayerChange(spiller: string): void;
}

const AddPlayer = ({ onScoreChange, onPlayerChange }: AddPlayerProps) => {
	return (
		<>
			<label>
				Spiller:
				<input
					type="text"
					placeholder="Spiller"
					onChange={(e) => onPlayerChange(e.target.value)}
				/>
			</label>
			<label>
				Antall poeng:
				<input
					type="number"
					onChange={(e) => onScoreChange(parseInt(e.target.value))}
				/>
			</label>
		</>
	);
};

export default AddPlayer;
