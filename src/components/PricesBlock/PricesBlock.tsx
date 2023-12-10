import './PricesBlock.scss';
import PriceItem from './PriceItem/PriceItem';
import pricesData from './prices-data';

function PricesBlock () {
    return (
        <section className='prices-block' id='prices'>
            <div className='prices-block-container'>
                <h2>WHICH PLAN FITS YOUR DAY</h2>

                <div className='prices-block-info-box'>
                    {
                        pricesData.map((block, index) => (
                            <PriceItem
                                key={block.id}
                                name={block.name}
                                price={block.price}
                                avlServices={block.avlServices}
                                notAvlServices={block.notAvlServices}
                            />
                        ))
                    }
                </div>
            </div>
        </section>
    )
};

export default PricesBlock;