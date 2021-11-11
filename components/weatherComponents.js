class Button extends React.Component{

    render(){
        return(
            <button>{this.props.children}</button>
        );
    }
}

class City extends React.Component {
    state = {name: "Arjeplog"};


    render() { 
        return <div>
            <h1>{this.state.name}</h1>
            <Forecast />
            <button className="chatButton">Fråga oss</button>
        </div>;
    }
}


class Forecast extends React.Component{
    constructor(props) {
        super(props);
        console.log(props);
        this.handleClick = this.handleClick.bind(this);
    }

    state = {
        forecasts: [
            {name: "Arjeplog", fromtime: "2020-01-01 00:00:00", totime: "2020-01-01 06:00:00", periodno: "0", periodname: "night", auxdata: {"TUNIT":"celsius","TVALUE":"6.4","ALTUNIT":"fahrenheit","ALTVALUE":"43.52","NUMBER":"4","WSYMB3NUMBER":"6","NAME":"Cloudy","RUNIT":"mm","RVALUE":"0","DEG":"22","CODE":"NNE","NAME":"North-northeast","MPS":"0.4","NAME":"Calm","UNIT":"hPa","VALUE":"837"}},
            {name: "Arjeplog",fromtime:"2020-01-02 00:00:00",totime:"2020-01-02 06:00:00",periodno:"0",periodname:"Night",auxdata:{"TUNIT":"celsius","TVALUE":"-8.2","ALTUNIT":"fahrenheit","ALTVALUE":"17.24","NUMBER":"10","WSYMB3NUMBER":"23","FNAME":"Sleet","RUNIT":"mm","RVALUE":"1.2","DEG":"257","CODE":"SW","NAME":"Southwest","MPS":"14.4","NAME":"Near Gale","UNIT":"hPa","VALUE":"1276"}},
            {name:"Arjeplog",fromtime:"2020-01-03 00:00:00",totime:"2020-01-03 06:00:00",periodno:"0",periodname:"Night",auxdata:{"TUNIT":"celsius","TVALUE":"-8.7","ALTUNIT":"fahrenheit","ALTVALUE":"16.34","NUMBER":"11","WSYMB3NUMBER":"25","FNAME":"Light snow","RUNIT":"mm","RVALUE":"1.7","DEG":"257","CODE":"W","NAME":"West","MPS":"15.3","NAME":"Near Gale","UNIT":"hPa","VALUE":"1267"}}
        ],
        count: 0
    };

    handleClick(number){
        this.setState({count: number})
    }

    render(){
        return (
            <div className="flex">
                <aside>
                    <button onClick={this.handleClick.bind(this, 1)}>1 dagsprognos</button>
                    <button onClick={this.handleClick.bind(this, 2)}>2 dagarsprognos</button>
                    <button onClick={this.handleClick.bind(this, 3)}>3 dagarsprognos</button>
                    <button onClick={this.handleClick.bind(this, 7)}>4 dagarsprognos</button>
                </aside>
                <div className="forecast">
                    <div><Button value="collapse">Öppna alla</Button><p>Temperatur max/min</p><p>Nederbörd per dygn</p><p>Vind/byvind</p></div>
                    {this.state.forecasts.slice(0, this.state.count).map(tag =>
                    <div key={tag.name+tag.fromtime+tag.totime} className="infoBox"><h2>{tag.fromtime.substring(0,10)}</h2><h2>{tag.auxdata.TVALUE}&#176;C</h2><h2>{tag.auxdata.RVALUE}{tag.auxdata.RUNIT}</h2><h2>{tag.auxdata.MPS}m/s</h2>
                    </div>)}
                </div>
            </div>
        );
    }
}


class ClimateCode extends React.Component {
    //Properties specifies here
    //State is an object the component need
    state = {
        climatecodes: [
            {code: "Af", name: "Tropical rainforest climate Tropical Rainforest", color: "#960000"},
            {code: "Am", name: "Tropical monsoon climate Tropical Monsoon", color: "#FF0000"}]
    };

    render() {
        
        return(
            <table>
                <tbody>
                    {this.state.climatecodes.map(tag => <tr key={tag.code}><td>{tag.code}</td><td>{tag.name}</td><td>{tag.color}</td></tr>)}
                </tbody>
            </table>
        )
    }
}

class Dialog extends React.Component {
    constructor(props) {
        super(props);
    }

    render() { 
        return <div>{this.props.children}</div>;
    }
}


ReactDOM.render(<City />, document.getElementById("content"));