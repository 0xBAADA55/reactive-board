import * as React from 'react';
import './Tile.css';

interface IProps {
    width: number,
    x: number,
    y: number
}

interface IState {
    backgroundColor: IRgbColor,
    timeout: number
}

interface IRgbColor{
    r: number,
    g: number,
    b: number
}

export class Tile extends React.Component<IProps, IState> {
    private defaultTileColor: IRgbColor = { r: 30, g: 144, b: 255};

    constructor (props: IProps) {
        super(props);
        this.state = {
            backgroundColor: this.defaultTileColor,
            timeout: 0
        };
    }

    public render () {
        const tileColor = this.state.backgroundColor; 
        const tileStyle = {
            flex: `1 1 calc(${this.props.width}% - 10px)`,
            fontSize: this.props.width * 15 + "%",
            backgroundColor: `rgb(${tileColor.r},${tileColor.g},${tileColor.b})`
        };
        return (
            <div className="board-tile" style={tileStyle} onClick={this.onTileClick}>
                {this.props.y}{this.props.x}
            </div>
        );
    }

    public reset = () => {
        this.setState({ backgroundColor: this.defaultTileColor });
        this.clearColorTimeoutIfExists();
    }

    private onTileClick = () => this.toggleRandomColorFor(2);

    private generateRandomRGBColor = (): IRgbColor => {
        const red = this.generateIntegerFromClosedInterval(0, 255);
        const green = this.generateIntegerFromClosedInterval(0, 255);
        const blue = this.generateIntegerFromClosedInterval(0, 255);
        return { r: red, g: green, b: blue };
    }

    private generateIntegerFromClosedInterval = (min: number, max: number): number => {
        min = Math.ceil(min);
        max = Math.floor(max) + 1;
        const result = Math.random() * (max - min) + min;
        return Math.floor(result);
    }

    private toggleRandomColorFor = (seconds: number) => {
        this.clearColorTimeoutIfExists();
        this.setState({ backgroundColor: this.generateRandomRGBColor() })
        const newTimeout: any = setTimeout(this.reset, seconds * 1000);
        this.setState({ timeout: newTimeout });
    }

    private clearColorTimeoutIfExists = () => {
        if(this.state.timeout > 0){
            clearTimeout(this.state.timeout);
            this.setState({ timeout: 0 });
        }
    }
}
