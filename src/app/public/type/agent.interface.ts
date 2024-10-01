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
  short: string;
}

export interface AgentNameInterface {
  short: string;
  full: string;
}

export interface AgentCommonEntityInterface {
  value: string;
}
