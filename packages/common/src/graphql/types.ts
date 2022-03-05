import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type CreateFormTemplateInput = {
  label?: InputMaybe<Scalars['String']>;
  /** JSON of form template */
  template: Scalars['String'];
};

export type FormTemplate = {
  __typename?: 'FormTemplate';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  label?: Maybe<Scalars['String']>;
  template: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createFormTemplate: FormTemplate;
  deleteFormTemplate: Scalars['Boolean'];
  saveFormTemplate: FormTemplate;
};


export type MutationCreateFormTemplateArgs = {
  input: CreateFormTemplateInput;
};


export type MutationDeleteFormTemplateArgs = {
  id: Scalars['String'];
};


export type MutationSaveFormTemplateArgs = {
  input: SaveFormTemplateInput;
};

export type Query = {
  __typename?: 'Query';
  getFormTemplate: FormTemplate;
  hello: Scalars['String'];
};


export type QueryGetFormTemplateArgs = {
  id: Scalars['String'];
};

export type SaveFormTemplateInput = {
  id: Scalars['String'];
  label?: InputMaybe<Scalars['String']>;
  /** JSON of form template */
  template: Scalars['String'];
};

export type SaveFormTemplateMutationVariables = Exact<{
  input: SaveFormTemplateInput;
}>;


export type SaveFormTemplateMutation = { __typename?: 'Mutation', saveFormTemplate: { __typename?: 'FormTemplate', id: string, template: string, label?: string | null, createdAt: any, updatedAt: any } };

export type CreateFormTemplateMutationVariables = Exact<{
  input: CreateFormTemplateInput;
}>;


export type CreateFormTemplateMutation = { __typename?: 'Mutation', createFormTemplate: { __typename?: 'FormTemplate', id: string, template: string, label?: string | null, createdAt: any, updatedAt: any } };

export type GetFormTemplateQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetFormTemplateQuery = { __typename?: 'Query', getFormTemplate: { __typename?: 'FormTemplate', id: string, template: string, label?: string | null, createdAt: any, updatedAt: any } };

export type FormTemplateFieldsFragment = { __typename?: 'FormTemplate', id: string, template: string, label?: string | null, createdAt: any, updatedAt: any };

export const FormTemplateFieldsFragmentDoc = gql`
    fragment FormTemplateFields on FormTemplate {
  id
  template
  label
  template
  createdAt
  updatedAt
}
    `;
export const SaveFormTemplateDocument = gql`
    mutation SaveFormTemplate($input: SaveFormTemplateInput!) {
  saveFormTemplate(input: $input) {
    ...FormTemplateFields
  }
}
    ${FormTemplateFieldsFragmentDoc}`;
export type SaveFormTemplateMutationFn = Apollo.MutationFunction<SaveFormTemplateMutation, SaveFormTemplateMutationVariables>;

/**
 * __useSaveFormTemplateMutation__
 *
 * To run a mutation, you first call `useSaveFormTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveFormTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveFormTemplateMutation, { data, loading, error }] = useSaveFormTemplateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSaveFormTemplateMutation(baseOptions?: Apollo.MutationHookOptions<SaveFormTemplateMutation, SaveFormTemplateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveFormTemplateMutation, SaveFormTemplateMutationVariables>(SaveFormTemplateDocument, options);
      }
export type SaveFormTemplateMutationHookResult = ReturnType<typeof useSaveFormTemplateMutation>;
export type SaveFormTemplateMutationResult = Apollo.MutationResult<SaveFormTemplateMutation>;
export type SaveFormTemplateMutationOptions = Apollo.BaseMutationOptions<SaveFormTemplateMutation, SaveFormTemplateMutationVariables>;
export const CreateFormTemplateDocument = gql`
    mutation CreateFormTemplate($input: CreateFormTemplateInput!) {
  createFormTemplate(input: $input) {
    ...FormTemplateFields
  }
}
    ${FormTemplateFieldsFragmentDoc}`;
export type CreateFormTemplateMutationFn = Apollo.MutationFunction<CreateFormTemplateMutation, CreateFormTemplateMutationVariables>;

/**
 * __useCreateFormTemplateMutation__
 *
 * To run a mutation, you first call `useCreateFormTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFormTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFormTemplateMutation, { data, loading, error }] = useCreateFormTemplateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateFormTemplateMutation(baseOptions?: Apollo.MutationHookOptions<CreateFormTemplateMutation, CreateFormTemplateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFormTemplateMutation, CreateFormTemplateMutationVariables>(CreateFormTemplateDocument, options);
      }
export type CreateFormTemplateMutationHookResult = ReturnType<typeof useCreateFormTemplateMutation>;
export type CreateFormTemplateMutationResult = Apollo.MutationResult<CreateFormTemplateMutation>;
export type CreateFormTemplateMutationOptions = Apollo.BaseMutationOptions<CreateFormTemplateMutation, CreateFormTemplateMutationVariables>;
export const GetFormTemplateDocument = gql`
    query GetFormTemplate($id: String!) {
  getFormTemplate(id: $id) {
    ...FormTemplateFields
  }
}
    ${FormTemplateFieldsFragmentDoc}`;

/**
 * __useGetFormTemplateQuery__
 *
 * To run a query within a React component, call `useGetFormTemplateQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFormTemplateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFormTemplateQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetFormTemplateQuery(baseOptions: Apollo.QueryHookOptions<GetFormTemplateQuery, GetFormTemplateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFormTemplateQuery, GetFormTemplateQueryVariables>(GetFormTemplateDocument, options);
      }
export function useGetFormTemplateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFormTemplateQuery, GetFormTemplateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFormTemplateQuery, GetFormTemplateQueryVariables>(GetFormTemplateDocument, options);
        }
export type GetFormTemplateQueryHookResult = ReturnType<typeof useGetFormTemplateQuery>;
export type GetFormTemplateLazyQueryHookResult = ReturnType<typeof useGetFormTemplateLazyQuery>;
export type GetFormTemplateQueryResult = Apollo.QueryResult<GetFormTemplateQuery, GetFormTemplateQueryVariables>;