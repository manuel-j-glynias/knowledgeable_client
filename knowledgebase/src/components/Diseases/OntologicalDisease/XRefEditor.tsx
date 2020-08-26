import * as React from 'react';
import {useAppendedContentState} from "../../../context/AppendedContentContext"
import {useUserContentState} from "../../../context/UserContentContext"
import {

    useOntologicalDiseaseAddXRefsMutation,
    OntologicalDiseaseAddXRefsMutationVariables,
    useCreateXRefNodeMutation,
    CreateXRefNodeMutationVariables,
    XRef,
    Maybe,

} from "../../../generated/graphql";
import {Fragment, useEffect} from "react";
import {get_date_as_hyphenated_string, get_unique_graph_id} from "../../common/Helpers/EditableStatementHelper";
import './styles.css'
import {get_description_mutation_object} from "./EditableStatementHelper";
import {GraphQLScalarType} from "graphql";

interface Props {

    xref_array: Array<Maybe<XRef>>;
    set_editing: (b: boolean) => void;
    ontologicaldisease_ID: string,
    exref_ID: string;
    exref_field: string;
    refetch: () => void;

}

const className = 'OntologicalDisease';

const XRefEditor: React.FC<Props> = ({xref_array, set_editing, exref_ID, exref_field,ontologicaldisease_ID, refetch}) => {
    // imports the variables delivered from OntologicalDisease.tsx

    const [xref_array_value, set_xref_array_value] = React.useState(xref_array!); // pass variables to set_xref_array_value to add things
    const create_xref_string_from_xref = (xref_dummy: Maybe<XRef>): string => {
        let xref_string: string = [xref_dummy!.id,xref_dummy!.source,xref_dummy!.sourceId].join('|')
        return xref_string;
    }
    const create_xref_string_array_from_xref_array = (xref_array: Array<Maybe<XRef>>): string[] => {
        let x_array: string[] = []
        let i
        if (xref_array.length > 0) {
            for (i = 0; i < xref_array.length; i++) {
                x_array.push(create_xref_string_from_xref(xref_array[i]))
            }
        }
        return x_array;
    }
    const xrefs_string_array_value = React.useRef(create_xref_string_array_from_xref_array(xref_array)); // variable array of xref strings that gets turned into xrefs


    const [addXrefListMutation, { loading: mutationLoading, error: mutationError, data:mutationData }] = useOntologicalDiseaseAddXRefsMutation({variables:{id:'', old_exref_id:'', exref_id: '',
            exref_field: '', date: '', user_id: '',exref_list:['']}}) // defines a mutation variable, uses the mutation from query.ts, defines the mutation variable variable types


    const [addXrefMutation, { loading: mutationLoading2, error: mutationError2, data:mutationData2 }] = useCreateXRefNodeMutation({variables:{id:'', source:'', sourceId:''}})



    const {
        AppendedContentState: {xrefToAppend}
    } = useAppendedContentState(); // defines the type of object that will be appended to the content state variable? goes with react.useState?

    const {
        UserContentState: {userID}
    } = useUserContentState(); // defines the userID object that will be used to changing the content state?

    const user_ID : string = userID; // defines the mutation object user id as the userID object that will be used to change to content state

    const get_xref_list_mutation_object = (id: string, oldEXRefID: string, exrefField: string, userID: string, exref_id_list:string[]): OntologicalDiseaseAddXRefsMutationVariables=> {

        const  variables :OntologicalDiseaseAddXRefsMutationVariables = {
            id:id,
            old_exref_id:oldEXRefID,
            date: get_date_as_hyphenated_string(),
            exref_field: exrefField,
            exref_list: exref_id_list,
            exref_id: get_unique_graph_id('exl_' ),
            user_id: userID,
        }
        return variables; // defines a function that takes variables of the types of the mutation variable variables, returns a mutation variable object
    }

    const get_xref_mutation_object = (id: string, xref_source: string, xref_sourceId: string): CreateXRefNodeMutationVariables=> {

        const  variables :CreateXRefNodeMutationVariables = {
            //id:get_unique_graph_id('xref_'.concat(xref_source.trim().toLowerCase())),
            id:id,
            source: xref_source,
            sourceId: xref_sourceId
        }
        return variables; // defines a function that takes variables of the types of the mutation variable variables, returns a mutation variable object
    }

    const create_xref_array_from_xref_string_array = (xref_string_array: string[]): [XRef] => {
        let x_array: any = []
        let i
        if (xref_string_array.length > 0) {
            for (i = 0; i < xref_string_array.length; i++) {
                let parts: string[] = []
                parts = xref_string_array[i].split('|')
                let xref: XRef = {id:parts[0],source:parts[1],sourceId:parts[2]}
                x_array.push(xref)

            }
        }
        return x_array;
    }
    const delete_xref = async (index: number) => {
        // console.log('delete_synonym:' + index)
        xrefs_string_array_value.current.splice(index, 1);
        set_xref_array_value(create_xref_array_from_xref_string_array(xrefs_string_array_value.current))
    } // function that deletes an exref from the State variable, takes Ref variable argument



    const create_xref_id_array_from_xref_array = (xref_array: [XRef]): string[] => {
        let x_array: string[] = []
        let i
        if (xref_array.length > 0) {
            for (i = 0; i < xref_array.length; i++) {
                x_array.push(xref_array[i].id)
            }
        }
        return x_array;
    }

    const [xref_source_value, set_xref_source_value] = React.useState(''); // defines variable that reps what people type in source field
    const [xref_sourceId_value, set_xref_sourceId_value] = React.useState('');// defines variable that reps what people type in sourceId field
    const add_xref = async () => {
        let xref_sources = xref_source_value.split(',')
        let xref_sourceIds = xref_sourceId_value.split(',')
        let i
        if (xref_sources.length > 0) {
            for (i = 0; i < xref_sources.length; i++) {
                let dummy_xref: Maybe<XRef> = {id:'',source:xref_sources[i],sourceId:xref_sourceIds[i]}
                xrefs_string_array_value.current.push(create_xref_string_from_xref(dummy_xref))

            }
        }

        set_xref_array_value(create_xref_array_from_xref_string_array(xrefs_string_array_value.current))

    }// function that adds an exref to the xref array  State variable, takes Ref variable current argument

    const save = async () => {

        const cur_xref_array = create_xref_array_from_xref_string_array(xrefs_string_array_value.current)
        let i
        for (i = 0; i < cur_xref_array.length; i++) {
            const cur_xref = cur_xref_array[i]
            if (cur_xref.id == '') {
                cur_xref.id = get_unique_graph_id('xref_'.concat(cur_xref.source.trim().toLowerCase()))
                const xref_mutation_object = get_xref_mutation_object(cur_xref.id, cur_xref.source, cur_xref.sourceId)
                await addXrefMutation({variables:xref_mutation_object})
            }
        }

        const cur_xrefs_id_array = create_xref_id_array_from_xref_array(cur_xref_array);

        const mutation_object = get_xref_list_mutation_object(ontologicaldisease_ID,exref_ID,exref_field, user_ID, cur_xrefs_id_array);
        //console.log(JSON.stringify(mutation_object))
        await addXrefListMutation({variables:mutation_object})

        // refetch()
        // set_editing(false)

    };// function defines variables necessary for mutation object function, creates the mutation object, and calls the function that will execute mutation on refetch


    const post_save = () => {
        if (mutationData!=null){
            refetch()
            set_editing(false)
        }  // defines function that refetches if mutation object has been created
    }

    useEffect(post_save,[mutationData]) //calls the function that refectches using the mutation object

    const cancelEdit = async () => {
        console.log('cancelEdit')
        set_editing(false)
    }; // turns off the editing state if the cancel button is clicked


    const get_xref_array_length = (): number => {
        if (xrefToAppend != null && xrefToAppend.id != '') {
            if (xrefs_string_array_value.current.indexOf(create_xref_string_from_xref(xrefToAppend)) === -1) {
                xrefs_string_array_value.current = xrefs_string_array_value.current.concat([create_xref_string_from_xref(xrefToAppend)])
            }
        }
        // console.log('length=' + synonym_array.current.length)
        return xrefs_string_array_value.current.length
    }


    return (<div className="form-group">

            {get_xref_array_length() > 0 ?
                <div>{xrefs_string_array_value.current.map((item: string, index: number) => (
                    <div className={`${className}__XRef_Wrapper`} key={index}>
                            <div>{item.split('|')[1]}</div>
                            <div>{item.split('|')[2]}</div>
                            <div><button className={`${className}__small-btn`} onClick={() => delete_xref(index)}>Delete</button></div>
                    </div>
                ))}</div>
                : <div>None</div>}
            <div>
                <div className="form-group">
                    <input type="text" placeholder="XRef Source to Add" value={xref_source_value} onChange={e => set_xref_source_value(e.target.value )} required/>
                    <input type="text" placeholder="XRef SourceId to Add" value={xref_sourceId_value} onChange={e => set_xref_sourceId_value(e.target.value )} required/>
                    <button value="Add" className="btn btn-primary my-1"
                            onClick={() => add_xref()}>Add
                    </button>
                </div>
            </div>
            <button value="Save" className="btn btn-primary my-1" onClick={() => {
                save()
            }}>Save
            </button>
            <button value="Cancel" className="btn btn-primary my-1"
                    onClick={() => cancelEdit()}>Cancel
            </button>
            <div>
                {mutationLoading && <p>Loading...</p>}
                {mutationError && <p>Error :( Please try again</p>}
                {mutationData && <p>Data</p>}
            </div>

        </div>
    )
}

export default XRefEditor;

