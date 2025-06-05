import '../App.css'

const Card = ({item}) => {
    return(
        <div className="card">
            <img src={item.Poster} alt="Image" onError={(e) => {
                e.target.src = 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
            }}/>
            <div className="details">
                    <h2>{item.Title}</h2>
                    <div className='sub-details'>
                        <p>{item.Year}</p>
                        <p style={{marginLeft:10}}>{item.Type}</p>
                    </div>
            </div>
        </div>
    )
}

export default Card