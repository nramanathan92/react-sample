import React from 'react';
import Image from '../atoms/Image';
import Text from '../atoms/Text';
import Link from '../atoms/Link';
import styles from './ProductInfo.module.css';

const ProductInfo = ({ imageSrc, imageAlt, name, link, price }) => (
  <div className={styles.container}>
    <Image src={imageSrc} alt={imageAlt} width={120} height={120} style={{ objectFit: 'cover' }} onError={e => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/120x120?text=No+Image'; }} />
    <div className={styles.info}>
      <Text as="h2">
        <Link href={link}>{name}</Link>
      </Text>
      <Text as="p" style={{ fontWeight: 'bold' }}>${price}</Text>
    </div>
  </div>
);

export default ProductInfo; 