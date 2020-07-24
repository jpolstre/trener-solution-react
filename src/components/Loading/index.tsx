import React from 'react';

import { Container } from './styles';

const Loading: React.FC<{label:string}> = ({label}) => {
return <Container>{label}</Container>;
}

export default Loading;