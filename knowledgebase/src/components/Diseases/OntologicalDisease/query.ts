import gql from 'graphql-tag';

export const QUERY_OntolgicalDisease = gql`
    query OntologicalDisease($id: ID) 
    {
        OntologicalDisease(id:$id){
            id
            name{
                ...es_fields
            }
            description{
                ...es_fields
            }
            xrefs {
                id
                field
                list{
                    id
                    source
                    sourceId
                }
                editor{
                    id
                    name
                }
                editDate
                references {
                    id
                }
                }
            synonyms {
                id
                stringList
                field
                references {
                    id
                }
                editor {
                    id
                    name
                }
                editDate
            }
            parents {
                name {
                    statement
                }
            }
            children {
                name {
                    statement
                }
            }
        }
    }
`




export const mutation_add_name = gql`
    mutation OntologicalDiseaseAddName($id: ID!, $old_es_id: ID!, $date: String!, $es_field: String!, $es_statement: String!, $es_id: ID!, $user_id: ID!, $ref_aray:[ID!]!) {
        deleteOntologicalDiseaseName(id: $id, name: [$old_es_id])
        createEditableStatement(editDate: $date, field: $es_field, id: $es_id, statement: $es_statement)
        addEditableStatementEditor(editor: [$user_id], id: $es_id)
        addEditableStatementReferences(id: $es_id, references: $ref_aray)
        addOntologicalDiseaseName(id: $id, name: [$es_id])
    }

`
export const mutation_add_synonym_string = gql`
    mutation OntologicalDiseaseAddSynonyms($id: ID!, $old_esyn_id: ID!, $date: String!, $esyn_field: String!, $esyn_list: [String]!, $esyn_id: ID!, $user_id: ID!) {
        deleteOntologicalDiseaseSynonyms(id: $id, synonyms: [$old_esyn_id])
        createEditableStringList(id: $esyn_id,field: $esyn_field,stringList: $esyn_list,editDate: $date)
        addEditableStringListEditor(editor: [$user_id], id: $esyn_id)
        addEditableStringListReferences(id: $esyn_id, references: [])
        addOntologicalDiseaseSynonyms(id:$id, synonyms: [$esyn_id])
        #        createEditableStatement(editDate: $date, field: $es_field, id: $es_id, statement: $es_statement)
        #        addEditableStatementEditor(editor: [$user_id], id: $es_id)
        #        addEditableStatementReferences(id: $es_id, references: [])
        #        addOmniGeneSynonyms(id: $gene_id, synonymsString: [$es_id])
    }
`

export const mutation_add_xref = gql`
    mutation OntologicalDiseaseAddXRefs($id: ID!, $old_exref_id: ID!, $exref_id: ID!, $exref_field: String!, $date: String!, $user_id: ID!, $exref_list: [ID!]!) {
        deleteOntologicalDiseaseXrefs(id: $id, xrefs:[$old_exref_id])
        createEditableXRefList(id: $exref_id, field: $exref_field, editDate: $date)
        addEditableXRefListEditor(id: $exref_id, editor: [$user_id])
        addEditableXRefListList(id: $exref_id, list: $exref_list)
        addEditableXRefListReferences(id: $exref_id, references: [])
        addOntologicalDiseaseXrefs(id: $id, xrefs: [$exref_id])
    }
`

export const mutation_create_xref = gql`
    mutation createXRefNode($id: ID!, $source: String!, $sourceId: String!) {
        createXRef(id: $id, source: $source, sourceId: $sourceId)
    }
`

export const mutation_add_description = gql`
    mutation addOntologicalDiseaseDescription($id: ID!, $old_es_id: ID!, $date: String!, $es_field: String!, $es_statement: String!, $es_id: ID!, $user_id: ID!, $ref_aray:[ID!]!) {
        deleteOntologicalDiseaseDescription(id: $id, description: [$old_es_id])
        createEditableStatement(editDate: $date, field: $es_field, id: $es_id, statement: $es_statement)
        addEditableStatementEditor(editor: [$user_id], id: $es_id)
        addEditableStatementReferences(id: $es_id, references: $ref_aray)
        addOntologicalDiseaseDescription(id: $id, description: [$es_id])
    }
`

