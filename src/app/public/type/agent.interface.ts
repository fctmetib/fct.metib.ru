export interface AgentInterface {
  suggestions: AgentSuggestionsInterface[]
}

export interface AgentSuggestionsInterface {
  data: AgentDataInterface,
  value: string
}

export interface AgentDataInterface {
  address: AgentCommonEntityInterface,
  inn: string,
  kpp: string,
  name: AgentNameInterface,
  ogrn: string,
  okpo: string,
  phones: AgentCommonEntityInterface[],
  emails: AgentCommonEntityInterface[],
  opf: AgentOpfInterface,
  type: 'LEGAL' | 'INDIVIDUAL'
}

export interface AgentOpfInterface {
  type: string;
  short: string;
}

export interface AgentNameInterface {
  short: string;
  short_with_opf?: string;
  full: string;
}

export interface AgentCommonEntityInterface {
  value: string;
}

export interface BankInfo {
  value: string;
  unrestricted_value: string;
  data: DataBankInfo;
}

export interface DataBankInfo {
  opf: {
    type: string,
    full: string,
    short: string
  }
  name: {
    payment: string;
    short: string
  }
  bic: string;
  swift: string;
  inn: string;
  kpp: string;
  correspondent_account: string;
  state: {
    registration_date: string;
  }
}
