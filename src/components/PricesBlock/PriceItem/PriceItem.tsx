import './PriceItem.scss';

function PriceItem (props : any) {
    return (
        <div className='price-item'>
            <div className='price-item-services'>
                {
                    props.avlServices.map((service : any, index: any) => (
                        <div key={index} className='price-item-services-box'>
                            <div className='price-item-services-text'>
                                {service.text}
                            </div>


                            {service.number !== "" ? 
                                (<div className='price-item-services-number'>{service.number}</div>) :
                                null
                            }
                        </div>
                    ))
                }
            </div>

            <div className='price-item-services not-available'>
                {
                    props.notAvlServices.map((service : any, index: any) => (
                        <div key={index} className='price-item-services-box not-available'>
                            <div className='price-item-services-text'>
                                {service.text}
                            </div>


                            {service.number !== "" ? 
                                (<div className='price-item-services-number'>{service.number}</div>) :
                                null
                            }
                        </div>
                    ))
                }
            </div>

            <div className='price-item-price-block'>
                <span>{props.name}</span>
                <span>€ {props.price}</span>
            </div>

            <span className='price-item-info-text'>3-4 months of editing time</span>
        </div>
    )
};

export default PriceItem;