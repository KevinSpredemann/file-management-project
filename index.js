import fileManager from './fileManager.js';
import readlineSync from 'readline-sync';
import path from 'path';
import url, {fileURLToPath} from 'url';

async function main(){

    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const baseDir = path.join(__dirname, './myfiles');
    fileManager.createDirectory(baseDir)

        while(true){
            console.log("\nMenu:");
            console.log("1. Criar arquivo");
            console.log("2. Listar arquivo");
            console.log("3. Ler arquivo");
            console.log("4. Escrever arquivo");
            console.log("5. Deletar arquivo");
            console.log("6. Sair");
        
            const choice = readlineSync.question('Escolha uma opcao:');
            try {
                switch (choice) {
                    case '1':
                        const fileName = readlineSync.question('Digite o nome do arquivo:');
                        const fileContent = readlineSync.question('Digite o conteudo do novo arquivo ( ou deixe em branco)');
                        const createFilePath = path.join(baseDir, fileName);
                        const fileMassage = await fileManager.createFile(createFilePath, fileContent);
                        console.log(fileMassage);
                        break;
                    case '2':
                        const files = await fileManager.listFiles(baseDir);
                        console.log('Arquivos no diretório:', files);
                        break;
                    case '3':
                        const readFileName = readlineSync.question('Digite o nome e extensão do arquivo:');
                        const readFilePath = path.join(baseDir, readFileName);
                        const content = await fileManager.readFile(readFilePath);
                        console.log('O conteúdo do arquivo é:', content);
                        break;
                    case '4':
                        const writeFileName = readlineSync.question('Digite o nome do arquivo:');
                        const writeFilePath = path.join(baseDir, writeFileName);
                        const newContent = readlineSync.question('Digite o conteúdo a ser adiconado:')
                        const message = await fileManager.writeFile(writeFilePath, newContent)
                        console.log(message);
                        break;
                    case '5':
                        const removeFileName = readlineSync.question('Digite o nome do arquivo:');
                        const removeFilePath = path.join(baseDir, removeFileName);
                        await fileManager.removeFile(removeFilePath)
                        console.log('Foi removido o arquivo:', removeFileName);
                        break;
                    case '6':
                        console.log('Saindo...');
                        return;
                    default:
                        console.log('Arquivo nao encontrado, tente novamente...');
                }
            } catch (error) {
                console.log(error)
            }    
       } 
    }
 

main();
