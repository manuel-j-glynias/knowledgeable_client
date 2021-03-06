import * as React from "react";
import {useVariantFusionQuery} from "../../../generated/graphql";
import GenomicMarkerFusionEditor from './GenomicMarkerFusionEditor'

interface Props {
    variant_id: string;
    editing_description: boolean;
    set_editing_description: (newEditionDescription: boolean) => void;

}
const GenomicMarkerFusionEditorContainer : React.FC<Props> = ({variant_id,editing_description,set_editing_description}) => {
    const {data, error, loading, refetch} = useVariantFusionQuery((
        {variables:{variant_id:variant_id}}
    ))
    React.useEffect(() => {
        refetch();
    }, [variant_id, refetch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>ERROR</div>;
    }

    if (!data) {
        return <div>No Variant</div>;
    }
    return <GenomicMarkerFusionEditor data={data} editing_description={editing_description} set_editing_description={set_editing_description} refetch={refetch}/>
}

export default GenomicMarkerFusionEditorContainer;