import { gql } from '@apollo/client';
import { RATE_FIELD } from '../fragments';

export const createRate = gql`
  ${RATE_FIELD}
  mutation CreateRate($createRateDto: CreateRateDto!) {
    createRate(createRateDto: $createRateDto) {
      ...rateField
    }
  }
`;
