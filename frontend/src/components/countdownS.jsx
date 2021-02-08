import React from "react"


class Countdown extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            count: 10
        }

    }

    componentDidMount(){
        let oneId = setInterval(()=>{
            this.setState({count: --this.state.count}, ()=> {
                if (this.state.count === 0){
                    clearInterval(oneId)

                    if(this.props.endGame){
                        this.props.restartGame(undefined, true)
                    } else {
                        this.props.restartGame()
                    }

                }
            })
        }, 1000)
    }

    render(){

        return(
            <>
                <p>{`time until game Restarts ${this.state.count}`}</p>
            </>
        )
    }



}

export default Countdown;