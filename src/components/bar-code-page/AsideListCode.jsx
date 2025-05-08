export default function AsideListCode({ exemplarsList }) {
    return (
      <main>
        {console.log(exemplarsList)}
        <h3 className="h3">Exemplars sel·leccionats</h3>
        <ul>
          {exemplarsList.map((exemplar, index) => (
            <li key={index}>
              <h4>{exemplar.titol}</h4>
              <p>
                <strong>Registre:</strong> {exemplar.registre}
              </p>
              <p>
                <strong>Centre:</strong> {exemplar.centre}
              </p>
              <p>
                <strong>CDU:</strong> {exemplar.CDU}
              </p>
            </li>
          ))}
        </ul>
      </main>
    );
  }