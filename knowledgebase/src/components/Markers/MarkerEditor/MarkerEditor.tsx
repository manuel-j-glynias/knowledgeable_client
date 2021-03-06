import React, {Fragment} from 'react';
import GenomicMarkerEditorContainer from "../GenomicMarkerEditor";
import MSIMarkerEditorContainer from "../MSIMarkerEditor";
import TMBMarkerEditorContainer from "../TMBMarkerEditor";
import ProteinExpressionMarkerEditorContainer from "../ProteinExpressionMarkerEditor";
import MarkerProfileEditorContainer from "../MarkerProfileEditor";
import {MarkerComponent} from "../../../generated/graphql";

interface Props {
    marker_id: string
    variant_type_name:string;
    variant_id:string;
    editing_description: boolean;
    set_editing_description: (newEditionDescription: boolean) => void;
    editing_protein_effect: boolean;
    set_editing_protein_effect: (newEditionDescription: boolean) => void;
    editing_components: boolean;
    set_editing_components: (newEditionDescription: boolean) => void;
    selected_component: MarkerComponent;
    set_selected_component:(selected:MarkerComponent | null) => void;
    markerType:string;
}

const MarkerEditor : React.FC<Props> = ({markerType,variant_type_name, marker_id,variant_id,
                                            editing_description,set_editing_description,editing_protein_effect,set_editing_protein_effect, editing_components,set_editing_components,
                                            selected_component,set_selected_component}) => {
    return (
        <Fragment>
            { (markerType==="GenomicVariantMarker") && <GenomicMarkerEditorContainer marker_id={marker_id} variant_type_name={variant_type_name}
                                          variant_id={variant_id} editing_description={editing_description}
                                          set_editing_description={set_editing_description}
                                          editing_protein_effect={editing_protein_effect}
                                          set_editing_protein_effect={set_editing_protein_effect}/> }

            { (markerType=="MSIMarker") && <MSIMarkerEditorContainer marker_id={marker_id} editing_description={editing_description}
                                                            set_editing_description={set_editing_description}/>}
            { (markerType=="TMBMarker") && <TMBMarkerEditorContainer marker_id={marker_id} editing_description={editing_description}
                                                             set_editing_description={set_editing_description}/>}
            { (markerType=="ProteinExpressionMarker") && <ProteinExpressionMarkerEditorContainer marker_id={marker_id} editing_description={editing_description}
                                                                     set_editing_description={set_editing_description}/>}
            { (markerType=="MarkerProfile") && <MarkerProfileEditorContainer marker_id={marker_id} editing_description={editing_description}
                                                                                                 set_editing_description={set_editing_description} editing_components={editing_components} set_editing_components={set_editing_components}
                                                                             selected_component={selected_component} set_selected_component={set_selected_component} />}

        </Fragment>
    )
}

export default MarkerEditor;