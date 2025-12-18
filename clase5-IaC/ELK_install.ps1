helm repo add elastic https://helm.elastic.co
helm repo update

 helm upgrade --install eck-operator elastic/eck-operator --namespace elastic-system --create-namespace