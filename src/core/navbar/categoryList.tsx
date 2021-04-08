import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Category  from '../../interfaces/categories';
import { Link } from 'wouter';

const CategoryList = (props: any) => {
    //TODO: resolve Type 'Number' cannot be used as an index type.
    const [subcat, setSub] = useState<any | null>(null);
    
    //props
    const categories: Array<Category> = props.categories;

    useEffect(() => {
        //TODO: resolve missing dependency 'categories.main' warning

        const displaySubmenu = (e) => {
            if(e.target.tagName === "LI" && e.target.id === "main-cat"){
                let index: Number = subcat;
                categories.forEach((el: Category, i: Number) => {
                    if(el.main === e.target.innerText)
                        index = i;
                });
                setSub(index);
            }
        }
        
        document.addEventListener("mouseover", displaySubmenu);
        
        return () => {
            document.removeEventListener("mouseover", displaySubmenu);
        }
    }, []);

    return (
        <div className="category-list" id="category-list">
            <div className="cl-section border-right">
                <ul>
                    {categories.map((el, index) => {
                        return <Link href={`/results/${el.main}`}><li key={index} id="main-cat">
                            {el.main}
                        </li></Link>;
                    })}
                </ul>
            </div>
            <div className="cl-section">
                {subcat === null ? <div></div> : 
                <div>
                    <ul>
                        {categories[subcat].sub.map((el, index)=> {
                           return <Link href={`/results/${categories[subcat].main}/${el}`}><li key={index}>
                               {el}
                            </li></Link>;
                        })}
                    </ul>
                </div>}
            </div>
        </div>
    );
}

const mapStateToProps = (state: any) => {
    return {
        categories: state.categories,
    }
}

export default connect(mapStateToProps)(CategoryList);