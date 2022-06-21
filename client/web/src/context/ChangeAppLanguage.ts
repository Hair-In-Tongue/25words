import { Language } from '../../../../api/types'
import { HathoraConnection } from '../../../.hathora/client'

export default (
    client: HathoraConnection | undefined,
    value: string | null
) => {
    const lng = value === 'en' ? Language.EN : Language.PL
    return client?.setGameLanguage({ language: lng })
}
