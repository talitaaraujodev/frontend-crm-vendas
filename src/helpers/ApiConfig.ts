const request = async (method: string, sufix: string, body?: any) => {
  try {
    const headersConfig = new Headers();
    headersConfig.set("Content-Type", "application/json");

    const fetchConfig: RequestInit = {
      method: method,
      headers: headersConfig,
      redirect: "follow",
      referrerPolicy: "no-referrer",
    };

    if (body) {
      fetchConfig.body = JSON.stringify(body);
    }

    const requestUrl = `${import.meta.env.VITE_URL_API}${sufix}`;
    console.log(requestUrl)
    const response = await fetch(requestUrl, fetchConfig);

    return response.json();
  } catch (error) {
    console.error("Erro ao realizar requisição:", error);
  }
};

export default request;
