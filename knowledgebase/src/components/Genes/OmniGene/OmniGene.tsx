import * as React from 'react';

import {OmniGeneQuery,useUpdateOmnigeneMutation} from '../../../generated/graphql';
import './styles.css';
import DescriptionEditor from "./DescriptionEditor";
import LiteratureReferenceContainer from "../../common/LiteratureReference";
import HistoryContainer from "../../common/History";
import SynonymEditor from "./SynonymEditor";
import OncogenicCategoryEditor from "./OncogenicCategoryEditor"
import {AppendedContentActionTypes, useAppendedContentState} from "../../../context/AppendedContentContext"
import SynonymHistoryContainer from "../../common/SynonymHistory";
import {useEditorContentState} from "../../../context/EditorContentContext";
import PanelNameEditableStatementEditor from "./PanelNameEditableStatementEditor";
import {get_ref_array} from "../../common/Helpers/Ref_helpers";
import {useEffect} from "react";


interface Props {
    data: OmniGeneQuery;
    editing_description: boolean;
    set_editing_description: (newEditionDescription: boolean) => void;
    editing_category: boolean;
    set_editing_category: (newEditionDescription: boolean) => void;
    editing_synonyms: boolean;
    set_editing_synonyms: (newEditionDescription: boolean) => void;
    refetch: () => void;

}

const className = 'OmniGene';

const OmniGene: React.FC<Props> = ({data,editing_description,set_editing_description, editing_category,set_editing_category,editing_synonyms,set_editing_synonyms,refetch}) => {
    // const [editing_category, set_editing_category] = React.useState(false);
    // const [editing_synonyms, set_editing_synonyms] = React.useState(false);
    const [editing_panel_name, set_editing_panel_name] = React.useState(false);

    const [showing_references, set_showing_references] = React.useState(false);
    const [showing_category_references, set_showing_category_references] = React.useState(false);

    const [show_panel_name_history, set_panel_name_history] = React.useState(false);
    const [show_description_history, set_description_history] = React.useState(false);
    const [show_category_history, set_category_history] = React.useState(false);
    const [show_synonyms_history, set_synonyms_history] = React.useState(false);
    const [should_mutate_names, set_should_mutate_names] = React.useState(false);

    const {
        AppendedContentState: {},
        setAppendedContentState
    } = useAppendedContentState();

    const {
        EditorContentState: {isEditor}
    } = useEditorContentState();

    const canEdit : boolean = isEditor;

    const edit_description = async () => {
        setAppendedContentState({type: AppendedContentActionTypes.appendToDescription, nextText: ''})
        set_editing_description(true)
    };
    const edit_categories = async () => {
        set_editing_category(true)
    }
    const edit_synonyms = async () => {
        setAppendedContentState({type: AppendedContentActionTypes.appendToSynonyms, nextSynonym: ''})
        set_editing_synonyms(true)
    }
    const show_references = async () => {
        set_showing_references(!showing_references)
    }
    const show_category_references = async () => {
        set_showing_category_references(!showing_category_references)
    }
    const humanify_date =  (date_string:string) : string => {
        const toks = date_string.split("-")
        //2020-04-14-08-26-11-045455
        const d = toks[1] + '/' + toks[2]  + '/' + toks[0] + ' at ' + toks[3] + ':' + toks[4]
        return d
    }
    const get_ref_array = (references: any) : string[] => {
        let refs : string[] = []
        for (let r of references) {
            // console.log(r)
            if (r.__typename== "LiteratureReference"){
                // console.log(r.PMID)
                refs.push(r.PMID)
            }
        }
        return refs
    }
    const [updateOmnigene, {}] = useUpdateOmnigeneMutation({variables:{gene_id:'',name:'',names:''}})

    async function call_update_mutation(gene_id:string, name:string,n:string){
        await updateOmnigene({variables: {gene_id:gene_id, name:name,names:n}})
    }


    const mutate_names =  () => {
        let b = false
        if (should_mutate_names) {
            if (data && data.OmniGene && data.OmniGene[0]) {
                let gene_id = data.OmniGene[0].id
                let names = data.OmniGene[0].names
                let name = data.OmniGene[0].name
                let panelName = data.OmniGene[0].panelName.statement
                let syn = data.OmniGene[0].synonyms.stringList.join('|')
                if (!names.includes(name) || !names.includes(panelName) || !names.includes(syn)) {
                    b = true
                    let n = syn
                    if (!n.includes(name)) {
                        n = n + '|' + name
                    }
                    if (!n.includes(panelName)) {
                        n = n + '|' + panelName
                    }
                    call_update_mutation(gene_id,name,n)
                    set_should_mutate_names(false)
                }
            }
        }
    }
    const update_names =  ()  =>{
        set_should_mutate_names(true)
    }
    useEffect(mutate_names,[data])

    if (!data.OmniGene) {
        return <div>No Selected OmniGene</div>;
    }
    if (!data.OmniGene[0]) {
        return <div></div>;

    }
    return (

        <div className={className}>
            <h1 className={`${className}__title`}>{data.OmniGene[0].name}</h1>
            <div className={`${className}__Wrapper`}>
                <div>Panel Name</div>
                <div>
                    {editing_panel_name ?
                        (
                            <PanelNameEditableStatementEditor statement={data.OmniGene[0].panelName.statement} set_editing={set_editing_panel_name} es_ID={data.OmniGene[0].panelName.id}
                                           es_field={data.OmniGene[0].panelName.field} omnigene_ID={data.OmniGene[0].id} ref_array={get_ref_array(data.OmniGene[0].panelName.references)} refetch={refetch} update_names={update_names}/>

                        ) :

                        <div>{data.OmniGene[0].panelName.statement}</div> }
                    {editing_panel_name ?
                        (
                            <span></span>

                        ) :

                        (<div className="form-group">
                                {canEdit && <button className="btn btn-primary my-1" onClick={() => set_editing_panel_name(true)}>Edit Panel Name</button>}
                                <button className="btn btn-primary my-1" onClick={() => set_panel_name_history(!show_panel_name_history)}>
                                    {show_panel_name_history ? <span>Hide History</span> : <span>Show History</span>}
                                </button>
                            </div>
                        )
                    }
                    {show_panel_name_history ?
                        <div>
                            <HistoryContainer field={data.OmniGene[0].panelName.field}  />
                        </div>
                        : <span></span>
                    }
                    <div><strong>Last Editor: </strong>{data.OmniGene[0].panelName.editor.name}</div>
                    <div><strong>Last Edit Date: </strong>{humanify_date(data.OmniGene[0].panelName.editDate)}</div>
                </div>

                <div>Gene Description</div>
                <div>
                    <div className="form-group">
                        {editing_description ? (

                                <DescriptionEditor description={data.OmniGene[0].geneDescription.statement} set_editing={set_editing_description} es_ID={data.OmniGene[0].geneDescription.id}
                                                   es_field={data.OmniGene[0].geneDescription.field} omnigene_ID={data.OmniGene[0].id}  refetch={refetch}/>
                            ) :
                            (
                                <div>
                                    {data.OmniGene[0].geneDescription.statement}
                                </div>
                            )}
                    </div>
                    <div></div>
                    {editing_description ?
                        (
                            <span></span>

                        ) :

                        (<div className="form-group">
                            {canEdit && <button className="btn btn-primary my-1" onClick={() => edit_description()}>Edit Description</button>}
                                <button className="btn btn-primary my-1" onClick={() => set_description_history(!show_description_history)}>
                                    {show_description_history ? <span>Hide History</span> : <span>Show History</span>}
                                </button>
                                <button className="btn btn-primary my-1" onClick={() => show_references()}>
                                    {showing_references ? <span>Hide References</span> : <span>Show References</span>}
                                </button>
                            </div>
                        )
                    }
                    {show_description_history ?
                        <div>
                            <HistoryContainer field={data.OmniGene[0].geneDescription.field}  />
                        </div>
                        : <span></span>
                    }
                    {
                        showing_references ?
                            <div><h3>References</h3>
                                {data.OmniGene[0].geneDescription.references.map((item, index) => (
                                <div key={index}> {item ? <LiteratureReferenceContainer id={item.id}/>: '' }</div>

                            ))}</div>   : (<span></span>)
                                             }

                    <div><strong>Last Editor: </strong>{data.OmniGene[0].geneDescription.editor.name}</div>
                    <div><strong>Last Edit Date: </strong>{humanify_date(data.OmniGene[0].geneDescription.editDate)}</div>
                </div>
                <div>Oncogenic Category</div>
                <div>

                    {editing_category ?
                        (
                            <OncogenicCategoryEditor category_string={data.OmniGene[0].oncogenicCategory.statement} set_editing={set_editing_category}es_ID={data.OmniGene[0].oncogenicCategory.id}
                                                     es_field={data.OmniGene[0].oncogenicCategory.field} omnigene_ID={data.OmniGene[0].id}
                                                    ref_array={get_ref_array(data.OmniGene[0].oncogenicCategory.references)} refetch={refetch}/>

                        ) :
                        data.OmniGene[0].oncogenicCategory.statement
                    }

                    {!editing_category ?
                        (<div className="form-group">
                            {canEdit && <button className="btn btn-primary my-1" onClick={() => edit_categories()}>Edit
                                    Category
                                </button>}
                                <button className="btn btn-primary my-1"
                                        onClick={() => set_category_history(!show_category_history)}>
                                    {show_category_history ? <span>Hide History</span> : <span>Show History</span>}
                                </button>
                                <button className="btn btn-primary my-1" onClick={() => show_category_references()}>
                                    {showing_category_references ? <span>Hide References</span> : <span>Show References</span>}
                                </button>
                            </div>
                        )
                        : (<span></span>)
                    }

                    {show_category_history ?
                        <div>
                            <HistoryContainer field={data.OmniGene[0].oncogenicCategory.field}  />
                        </div>
                        : <span></span>
                    }
                    {
                        showing_category_references ?
                            <div><h3>References</h3>
                                {data.OmniGene[0].oncogenicCategory.references.map((item, index) => (
                                    <div key={index}> {item ? <LiteratureReferenceContainer id={item.id}/>: '' }</div>

                                ))}</div>   : (<span></span>)
                    }
                    <div><strong>Last Editor: </strong>{data.OmniGene[0].oncogenicCategory.editor.name}</div>
                    <div><strong>Last Edit Date: </strong>{humanify_date(data.OmniGene[0].oncogenicCategory.editDate)}</div>
                </div>


                <div>Synonyms</div>
                <div>
                    {editing_synonyms ?
                        (
                            <SynonymEditor synonym_string={data.OmniGene[0].synonyms.stringList.join(',')} set_editing={set_editing_synonyms} es_ID={data.OmniGene[0].synonyms.id}
                                           es_field={data.OmniGene[0].synonyms.field} omnigene_ID={data.OmniGene[0].id}  refetch={refetch} update_names={update_names}/>

                        ) :

                        <div>{data.OmniGene[0].synonyms.stringList.join(',')}</div> }
                    {editing_synonyms ?
                        (
                            <span></span>

                        ) :

                        (<div className="form-group">
                            {canEdit && <button className="btn btn-primary my-1" onClick={() => edit_synonyms()}>Edit Synonyms</button>}
                                <button className="btn btn-primary my-1" onClick={() => set_synonyms_history(!show_synonyms_history)}>
                                    {show_synonyms_history ? <span>Hide History</span> : <span>Show History</span>}
                                </button>
                            </div>
                        )
                    }
                    {show_synonyms_history ?
                        <div>
                            <SynonymHistoryContainer field={data.OmniGene[0].synonyms.field}  />
                        </div>
                        : <span></span>
                    }
                    <div><strong>Last Editor: </strong>{data.OmniGene[0].synonyms.editor.name}</div>
                    <div><strong>Last Edit Date: </strong>{humanify_date(data.OmniGene[0].synonyms.editDate)}</div>
                </div>


            </div>


        </div>

    );
};

export default OmniGene;