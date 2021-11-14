class Button extends React.Component{

    render(){
        return(
            <button>{this.props.children}</button>
        );
    }
}

class Info extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    state = {name: "Arjeplog", class: "none", show: true, button: "Fråga oss"};

    handleClick(){
        this.state.show = !this.state.show;
        if(this.state.show){
            this.setState({class: "none", button: "Fråga oss"});
        }else{
            this.setState({class: "dialog", button: "Stäng"});
        }
    }

    render() { 
        return <div>
            <h1>{this.state.name}</h1>
            <Forecast />
            <ChatDialog class={this.state.class} name={this.state.name}><h1>Väderchatt - {this.state.name}</h1></ChatDialog>
            <button onClick={this.handleClick} className="chatButton">{this.state.button}</button>
            <WelcomeDialog />
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
                    <button onClick={this.handleClick.bind(this, 10)}>10 dagarsprognos</button>
                </aside>
                <div className="forecast">
                    <div><Button value="collapse">Öppna alla</Button><p>Temperatur max/min</p><p>Nederbörd per dygn</p><p>Vind/byvind</p></div>
                    {this.state.forecasts.slice(0, this.state.count).map(tag =>
                    <Accordion>
                        <div key={tag.name+tag.fromtime+tag.totime} className="infoBox"><h2>{tag.fromtime.substring(0,10)}</h2><h2>{tag.auxdata.TVALUE}&#176;C</h2><h2>{tag.auxdata.RVALUE}{tag.auxdata.RUNIT}</h2><h2>{tag.auxdata.MPS}m/s</h2>
                        </div>
                    </Accordion>
                    )}
                </div>
            </div>
        );
    }
}

class Accordion extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.setState();

    }

    render() { 
        return <div onClick={this.handleClick} className="toggle">{this.props.children}</div>;
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

class ChatDialog extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {chatdialog: [{id: 1, user: "Jimmy", message: "Hejsan!"}, {id: 2, user: "Admin", message: "Hej"},{id: 3, user: "Admin", message: "Hej"}]};
    }
    handleClick(){

    }
    render() { 
        return (<div className={this.props.class}>
            <Dialog><h1>Väderchatt - {this.props.name}</h1>
            <div className="messageBox">
                {this.state.chatdialog.map(tag => <div className="message" key={tag.id}><div>{tag.user}</div><div>{tag.message}</div><Like/></div>)}
            </div>
            <div className="inputBox">
                <input type="text"></input><button onClick={this.handleClick}>Skicka</button>
            </div>
            </Dialog>
            
            </div>)
    }
}

class WelcomeDialog extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {class: "dialog"};
    }

    handleClick(){
        this.setState({class: "none"});
        
    }

    render() { 
        return (<Dialog class={this.state.class}><h1>Välkommen till vä'rt!</h1>
        <p>Här kan du följa prognosen för vär't i 1 till 10 dagarsprognos.</p>
        <p>Skriv in vilken ort du vill veta vä'rt!</p>
        <button onClick={this.handleClick}>Tackar!</button>
        </Dialog>)
    }
}

class Dialog extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    render() { 
        return <div className={this.props.class}>{this.props.children}</div>;
    }
}

class Like extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        //Do something when clicked on button
    }

    render() { 
        return <button onClick={this.handleClick}>Like</button>;
    }
}

async function getData() {
    const response = await fetch("API/Forecast.php", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })
        .then((response) => response.json()).then(data => {
        console.log(data);
        });
    }

    getData();

ReactDOM.render(<Info />, document.getElementById("content"));