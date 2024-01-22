import './styles.css';

export function Card(props) {
    /*
     em vez de usar assim Card(props)
     pode usar assim Card({name, time})
    */
    return(
        <div className='card'>
            <strong>{props.name}</strong>
            <small>{props.time}</small>
        </div>
    )
}