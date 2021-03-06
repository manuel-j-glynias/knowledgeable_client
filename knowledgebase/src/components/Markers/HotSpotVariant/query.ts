import gql from 'graphql-tag';

export const QUERY_HOTSPOT_VARIANT = gql`
    query HotSpotVariant($id:ID){
        HotSpotVariant(id:$id) {
            id
            gene
            name
            referenceAminoAcid
            variantAminoAcid
            begin
            end
            position
            occurrences(orderBy:perThousandOccurrence_desc){
                disease{
                    id
                    name{
                        id
                        statement
                    }
                }
                oncoTreeCode
                occurrences{
                    ...ei_fields
                }
                totalSamples{
                    ...ei_fields
                }
                percentOccurrence{
                    ... es_fields
                }
                perThousandOccurrence
            }
        }
    }

    
`

export const mutation_delete_hsVariant = gql`
    mutation GenomicVariantDeleteHotSpotVariant($variant_id: ID!, $hs_var_id:ID!) {
        deleteGenomicVariantHotSpotVariant(id: $variant_id, hotSpotVariant: [$hs_var_id])
    }
`