// Deploy only the learning-site entry files; preserve the existing static site and backend.
import { spawnSync } from 'node:child_process'
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const host = 'root@182.61.48.178'
const remote = '/srv/www.caijiechao.com'
const baseline = process.argv[2] || 'baseline/homepage-sites-20261013'
const files = ['index_page/css/learning-sites.css', 'index_page/js/learning-sites.js', 'index_page/js/i18n.js', 'shared/site-data.js', 'index.html']
const hash = bytes => createHash('sha256').update(bytes).digest('hex')
function run(command, args, input) {
  const result = spawnSync(command, args, { cwd: root, input, encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 })
  if (result.error || result.status !== 0) throw new Error(`${command} failed: ${result.error || result.stderr}`)
  return result.stdout
}
const commit = run('git', ['rev-parse', 'HEAD']).trim()
if (run('git', ['status', '--porcelain', '--', 'frontend']).trim()) throw new Error('Commit frontend changes before deployment')
const stamp = new Date().toISOString().replace(/[-:.]/g, '').replace('T', '-').slice(0, 15) + '-' + commit.slice(0, 7)
const work = resolve(root, '.git', 'homepage-deploy', stamp)
mkdirSync(work, { recursive: true })
const manifest = files.map(name => {
  const source = spawnSync('git', ['show', `${baseline}:frontend/${name}`], { cwd: root })
  const expected = source.status === 0 ? [hash(source.stdout), hash(source.stdout.toString().replace(/\r?\n/g, '\r\n'))] : null
  return { name, expected, hash: hash(readFileSync(resolve(root, 'frontend', name))) }
})
writeFileSync(resolve(work, 'files.txt'), files.join('\n') + '\n')
run('tar', ['-C', 'frontend', '-czf', resolve(work, 'overlay.tar.gz'), '-T', resolve(work, 'files.txt')])
const archiveHash = hash(readFileSync(resolve(work, 'overlay.tar.gz')))
const backup = `${remote}/backups/homepage-sites-${stamp}`
run('ssh', ['-o', 'BatchMode=yes', host, `test ! -e ${backup} && mkdir -p ${backup}/incoming`])
run('scp', ['-o', 'BatchMode=yes', resolve(work, 'overlay.tar.gz'), `${host}:${backup}/overlay.tar.gz`])
const output = run('ssh', ['-o', 'BatchMode=yes', host, 'python3 -'], `
import hashlib,json,pathlib,shutil,tarfile,os,pwd,grp
root=pathlib.Path('${remote}')
backup=pathlib.Path('${backup}')
manifest=json.loads(${JSON.stringify(JSON.stringify(manifest))})
archive=backup/'overlay.tar.gz'
digest=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
assert digest(archive)=='${archiveHash}', 'archive checksum mismatch'
with tarfile.open(archive) as tar:tar.extractall(backup/'incoming',filter='data')
for item in manifest:
    path=root/'frontend'/item['name']
    assert digest(backup/'incoming'/item['name'])==item['hash'], item['name']
    if item['expected'] is None:assert not path.exists(), 'New file already exists: '+str(path)
    else:assert path.is_file() and (digest(path) in item['expected'] or hashlib.sha256(path.read_bytes().replace(bytes([13,10]),bytes([10]))).hexdigest() in item['expected']), 'Production changed since baseline: '+str(path)
for item in manifest:
    path=root/'frontend'/item['name']
    if path.exists():
        saved=backup/'original'/item['name'];saved.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(path,saved)
marker=root/'FRONTEND_DEPLOYED_COMMIT'
if marker.exists():shutil.copy2(marker,backup/'FRONTEND_DEPLOYED_COMMIT')
uid=pwd.getpwnam('cjcblog').pw_uid;gid=grp.getgrnam('cjcblog').gr_gid
for item in manifest:
    path=root/'frontend'/item['name'];temp=path.with_name(path.name+'.homepage-next')
    shutil.copyfile(backup/'incoming'/item['name'],temp);os.chmod(temp,0o644);os.chown(temp,uid,gid);os.replace(temp,path)
for item in manifest:assert digest(root/'frontend'/item['name'])==item['hash']
marker.write_text('${commit}'+chr(10))
report={'commit':'${commit}','backup':str(backup),'files':manifest,'verified':True}
(backup/'deployment.json').write_text(json.dumps(report,indent=2))
print(json.dumps(report,indent=2))
`)
writeFileSync(resolve(work, 'deployment.json'), output)
console.log(output)
