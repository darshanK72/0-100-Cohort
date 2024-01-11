function Card({cardDetails}){
    
    return (
        <>
            <div className="card">
                <div className="card-header">
                    New User
                </div>
                <div className="card-body">
                    <div className="card-title">
                        {cardDetails.firstName + " " + cardDetails.lastName} 
                    </div>
                    <div className="card-text">
                        {cardDetails.address}
                    </div>
                    <div className="buttons mt-3">
                    <a href="#" className="btn btn-primary me-3">Contact</a>
                    <a href="#" className="btn btn-primary me-3">Email</a>
                    </div>
                </div>
            </div>

        </>
    )

}

export default Card;