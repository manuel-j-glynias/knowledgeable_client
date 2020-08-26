import * as React from 'react'
import './styles.css'
import {OntologicalDiseaseComponentsQuery} from "../../../generated/graphql";
import GoDiseaseContainer from "../GODisease";
import JaxDiseaseContainer from "../JaxDisease";
import OncoTreeDiseaseContainer from "../OncoTreeDisease";
import DODiseaseContainer from "../DODisease";



const className = 'ContentContainer';

export interface Props {
    data: OntologicalDiseaseComponentsQuery;
    editing_description: boolean;
    editing_synonyms: boolean;
    editing_xrefs: boolean;
}

const ContentContainer: React.FC<Props> = ({
                                               data,
                                               editing_synonyms,editing_description,editing_xrefs
                                           }) => {

    const [show_DODisease, set_show_DODisease] = React.useState(false);
    const [show_GODisease, set_show_GODisease] = React.useState(false);
    const [show_jaxDisease, set_show_jaxDisease] = React.useState(false);
    const [show_oncoTreeDiseases, set_show_oncoTreeDiseases] = React.useState(false);

    if (!data.OntologicalDisease){
        return <div>Please select a disease from the panel</div>
    }
    if (!data.OntologicalDisease[0]){
        return <div>Please select a disease from the panel</div>
    }

    return (

        <div className={className}>
            <h3 className={'ContentContainer__title'}>Content</h3>

            <div className="form-group">
                <button className="btn btn-primary my-1" onClick={() => set_show_DODisease(!show_DODisease)}>
                    {show_DODisease ? <span>Hide DO Disease</span> : <span>Show DO Disease</span>}
                </button>
                <button className="btn btn-primary my-1" onClick={() => set_show_GODisease(!show_GODisease)}>
                    {show_GODisease ? <span>Hide GO Disease</span> : <span>Show GO Disease</span>}
                </button>
                <button className="btn btn-primary my-1" onClick={() => set_show_jaxDisease(!show_jaxDisease)}>
                    {show_jaxDisease ? <span>Hide Jax Disease</span> : <span>Show Jax Disease</span>}
                </button>
                <button className="btn btn-primary my-1" onClick={() => set_show_oncoTreeDiseases(!show_oncoTreeDiseases)}>
                    {show_oncoTreeDiseases ? <span>Hide OncoTree Disease</span> : <span>Show OncoTree Disease</span>}
                </button>
            </div>
            <div className = {`${className}__Wrapper`}>

            <div> {show_DODisease ?
                <div>
                    <div> {data.OntologicalDisease[0].doDiseases.list.length  > 0 ?
                        data.OntologicalDisease[0].doDiseases.list.map((item,
                                                                        index) =>
                            (
                                <div key={index}> {item ?  <DODiseaseContainer id={item.id} editing_description={editing_description} editing_synonyms={editing_synonyms} editing_xrefs={editing_xrefs} />: ''}</div>

                            )) : <span>None</span>}</div>
                </div> : (<span></span>)
            }
            </div>

            <div> {show_GODisease ?
                <div>
                    <div> {data.OntologicalDisease[0].goDiseases.list.length  > 0 ?
                        data.OntologicalDisease[0].goDiseases.list.map((item,
                                                                         index) =>
                            (
                                <div key={index}> {item ?  <GoDiseaseContainer id={item.id} editing_description={editing_description} editing_synonyms={editing_synonyms} editing_xrefs={editing_xrefs} />: ''}</div>

                            )) : <span>None</span>}</div>
                </div> : (<span></span>)
            }
            </div>

            <div> {show_jaxDisease ?
                <div>
                <div> {data.OntologicalDisease[0].jaxDiseases.list.length  > 0 ?
                    data.OntologicalDisease[0].jaxDiseases.list.map((item,
                    index) =>
                    (
                    <div key={index}> {item ?  <JaxDiseaseContainer id={item.id} editing_description={editing_description} editing_synonyms={editing_synonyms}/>: ''}</div>

                    )) : <span>None</span>}</div>
                </div> : (<span></span>)
            }
            </div>

            <div> {show_oncoTreeDiseases  ?
                <div>
                    <div> {data.OntologicalDisease[0].oncoTreeDiseases .list.length  > 0 ?
                        data.OntologicalDisease[0].oncoTreeDiseases .list.map((item,
                                                                         index) =>
                            (
                                <div key={index}> {item ?  <OncoTreeDiseaseContainer  id={item.id} editing_description={editing_description} editing_synonyms={editing_synonyms} editing_xrefs={editing_xrefs} />: ''}</div>

                            )) : <span>None</span>}</div>
                </div> : (<span></span>)
            }
            </div>

        </div>

    </div>

    )
}

export default ContentContainer;