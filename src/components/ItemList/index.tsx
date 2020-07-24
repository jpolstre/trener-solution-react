import React from 'react'
import { Li, IconArrowRight, Anchor } from './styles'

export interface IItemList {
	label: string
	labelLink: string
}

interface OwnProps {
	onClick?: () => void
	typeButton?: boolean
}
const ItemList: React.FC<IItemList & OwnProps> = ({ label, labelLink, onClick, typeButton }) => {
	const makeButtonLink = () => {
		return typeButton ? (
			<React.Fragment>
				<span>{labelLink}&nbsp;&nbsp;</span>
			</React.Fragment>
		) : (
			<React.Fragment>
				<span>{labelLink}</span>
				<IconArrowRight />
			</React.Fragment>
		)
	}
	return (
		<Li>
			<strong>{label}</strong>
			{onClick ? <Anchor onClick={onClick}>{makeButtonLink()}</Anchor> : <span>{labelLink}&nbsp;&nbsp;</span>}
		</Li>	
	)
}

export default ItemList
