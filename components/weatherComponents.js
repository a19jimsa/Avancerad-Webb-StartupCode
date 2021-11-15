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
        console.log(this.props.date);
        this.state = {data: this.props.data, class: "none", show: true, button: "Chatta"};
    }

    handleClick(){
        this.state.show = !this.state.show;
        if(this.state.show){
            this.setState({class: "none", button: "Chatta"});
        }else{
            this.setState({class: "dialog", button: "Stäng"});
        }
    }

    render() {
        return <div>
            <h1>{this.state.data.name}</h1>
            <div>{this.state.data.about}</div>
            <div>{this.state.data.climate}</div>
            <Forecast name={this.state.data.name} days={this.props.date}/>
            <ChatDialog class={this.state.class} name={this.state.data.name}><h1>Väderchatt - {this.state.data.name}</h1></ChatDialog>
            <button onClick={this.handleClick} className="chatButton">{this.state.button}</button>
            <WelcomeDialog />
            <ClimateCode />
        </div>;
    }
}


class Forecast extends React.Component{
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.updateForecast();
        console.log(this.props.days);
    }

    state = {
        forecast: [
            {name: "Arjeplog", fromtime: "2020-01-01 00:00:00", totime: "2020-01-01 06:00:00", periodno: "0", periodname: "night", auxdata: {"TUNIT":"celsius","TVALUE":"6.4","ALTUNIT":"fahrenheit","ALTVALUE":"43.52","NUMBER":"4","WSYMB3NUMBER":"6","NAME":"Cloudy","RUNIT":"mm","RVALUE":"0","DEG":"22","CODE":"NNE","NAME":"North-northeast","MPS":"0.4","NAME":"Calm","UNIT":"hPa","VALUE":"837"}},
            {name: "Arjeplog",fromtime:"2020-01-02 00:00:00",totime:"2020-01-02 06:00:00",periodno:"0",periodname:"Night",auxdata:{"TUNIT":"celsius","TVALUE":"-8.2","ALTUNIT":"fahrenheit","ALTVALUE":"17.24","NUMBER":"10","WSYMB3NUMBER":"23","FNAME":"Sleet","RUNIT":"mm","RVALUE":"1.2","DEG":"257","CODE":"SW","NAME":"Southwest","MPS":"14.4","NAME":"Near Gale","UNIT":"hPa","VALUE":"1276"}},
            {name:"Arjeplog",fromtime:"2020-01-03 00:00:00",totime:"2020-01-03 06:00:00",periodno:"0",periodname:"Night",auxdata:{"TUNIT":"celsius","TVALUE":"-8.7","ALTUNIT":"fahrenheit","ALTVALUE":"16.34","NUMBER":"11","WSYMB3NUMBER":"25","FNAME":"Light snow","RUNIT":"mm","RVALUE":"1.7","DEG":"257","CODE":"W","NAME":"West","MPS":"15.3","NAME":"Near Gale","UNIT":"hPa","VALUE":"1267"}}
        ],
        draw: false
    };

    async updateForecast(number){
        const params = {
            ort: this.props.name,
            days: number
        }
        const response = await fetch("API/Forecast.php", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        })
        .then((response) => response.json()).then(data => {
        this.setState({forecast:data, draw: true});
        console.log("Detta är data:", data);
        });
    }

    async handleClick(number){
        this.updateForecast(number);
    }

    aside(){
        return(
        <aside>
            <button onClick={this.handleClick.bind(this, 1)}>1 dagsprognos</button>
            <button onClick={this.handleClick.bind(this, 3)}>3 dagarsprognos</button>
            <button onClick={this.handleClick.bind(this, 7)}>7 dagarsprognos</button>
        </aside>)
    }

    draw(){
        if(this.state.draw){
            return(
            <div className="flex">
                {this.aside()}
                <div className="forecast">
                    <div><Button value="collapse">Öppna alla</Button><p>Från</p><p>Till</p><p>Temperatur max/min</p><p>Nederbörd per dygn</p><p>Vind/byvind</p></div>
                    {this.state.forecast.map(tag =>
                    <Accordion>
                        <div key={tag.name+tag.fromtime+tag.totime} className="infoBox"><h2>{tag.name}</h2><h2>{tag.fromtime}</h2><h2>{tag.totime}</h2><h2>{tag.forecast.TVALUE}&#176;C</h2><h2>{tag.forecast.RVALUE}{tag.forecast.RUNIT}</h2><h2>{tag.forecast.MPS}m/s</h2>
                        </div>
                    </Accordion>
                    )}
                </div>
            </div>)
        }else{
            return (
                <div className="flex">
                {this.aside()}
                </div>
            )
        }
    }

    render(){
        return (
            this.draw()
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
    constructor(props) {
        super(props);
        this.getData();
    }
    //Properties specifies here
    //State is an object the component need
    state = {
        climatecodes: [
            {code: "Af", name: "Tropical rainforest climate Tropical Rainforest", color: "#960000"},
            {code: "Am", name: "Tropical monsoon climate Tropical Monsoon", color: "#FF0000"}]
    };

    async getData(){
    const params = {
        ort: this.props.name
    }
    const response = await fetch("API/Climatecodes.php", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
    })
    .then((response) => response.json()).then(data => {
        this.setState({climatecodes:data})
    });
    }

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
        this.getData();
        this.state = {chatdialog: [{id: 1, user: "Jimmy", message: "Hejsan!"}, {id: 2, user: "Admin", message: "Hej"},{id: 3, user: "Admin", message: "Hej"}]};
    }

    async getData(){
        const params = {
            ort: this.props.name
        }
        const response = await fetch("API/Comments.php", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        })
        .then((response) => response.json()).then(data => {
        this.setState({chatdialog:data})
        });
    }

    handleClick(){

    }
    render() { 
        return (<div className={this.props.class}>
            <Dialog><h1>Väderchatt - {this.props.name}</h1>
            <div className="messageBox">
                {this.state.chatdialog.map(tag => <div className="message" key={tag.id+tag.username+tag.content}><p>{tag.username}</p><p>{tag.content}</p><Like/></div>)}
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
