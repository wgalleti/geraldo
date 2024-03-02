import PropTypes from 'prop-types'
const Logo = ({ className = '' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="0" y="0" width="4" height="100" fill="currentColor" />
      <rect x="6" y="0" width="4" height="100" fill="currentColor" />
      <rect x="12" y="0" width="4" height="100" fill="currentColor" />
      <rect x="28" y="0" width="4" height="100" fill="currentColor" />
      <rect x="34" y="0" width="4" height="100" fill="currentColor" />
      <rect x="40" y="0" width="4" height="100" fill="currentColor" />
      <rect x="46" y="0" width="4" height="100" fill="currentColor" />
      <rect x="52" y="0" width="4" height="100" fill="currentColor" />
      <rect x="58" y="0" width="4" height="100" fill="currentColor" />
      <rect x="74" y="0" width="4" height="100" fill="currentColor" />
      <rect x="80" y="0" width="4" height="100" fill="currentColor" />
      <rect x="86" y="0" width="4" height="100" fill="currentColor" />
      <rect x="92" y="0" width="4" height="100" fill="currentColor" />
      <rect x="108" y="0" width="4" height="100" fill="currentColor" />
      <rect x="114" y="0" width="4" height="100" fill="currentColor" />
      <rect x="130" y="0" width="4" height="100" fill="currentColor" />
      <rect x="136" y="0" width="4" height="100" fill="currentColor" />
      <rect x="142" y="0" width="4" height="100" fill="currentColor" />
      <rect x="158" y="0" width="4" height="100" fill="currentColor" />
      <rect x="164" y="0" width="4" height="100" fill="currentColor" />
      <rect x="170" y="0" width="4" height="100" fill="currentColor" />
      <rect x="176" y="0" width="4" height="100" fill="currentColor" />
      <rect x="182" y="0" width="4" height="100" fill="currentColor" />
      <rect x="198" y="0" width="4" height="100" fill="currentColor" />
      <rect x="204" y="0" width="4" height="100" fill="currentColor" />
      <rect x="210" y="0" width="4" height="100" fill="currentColor" />
      <rect x="216" y="0" width="4" height="100" fill="currentColor" />
      <rect x="222" y="0" width="4" height="100" fill="currentColor" />
      <rect x="228" y="0" width="4" height="100" fill="currentColor" />
    </svg>
  )
}

Logo.propTypes = {
  className: PropTypes.string
}

export { Logo }
