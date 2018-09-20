import * as React from 'react';

interface IProps {
    handler: (dimension: number) => void,
    initialSize: number
}

interface IState {
    currentDimension: number
}

export class BoardDimensionForm extends React.Component<IProps, IState> {

    constructor (props: IProps) {
        super(props);
        this.setCurrentDimension = this.setCurrentDimension.bind(this);
        this.state = {currentDimension: this.props.initialSize};
    }

    public render () {
        return(
            <div>
                <input min={1} type="number" value={this.state.currentDimension} onChange={this.setCurrentDimension}/>
            </div>
        );
    }

    private setCurrentDimension (event: React.FormEvent<HTMLInputElement>):void {
        const { value }: any = event.target;
        this.setState({currentDimension: parseInt(value,10)}, () => this.props.handler(this.state.currentDimension));
    }
}